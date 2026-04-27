const db = require("./database");

const months = 24;
//insurance price per month is 18, they were going to increase it to 19 a month but we will leave it at 18 for now.
const theInsuranceThatIsAScamThroughAssurion = 18;

//will set this is for typically new phones because i want this quote tool to be for new custoemrs.
const phonePrices = {iphone15: 630, iphone16: 730, iphone16e: 630,iphone17: 830,iphoneAir: 999,iphone17pro: 1099,iphone17promax: 1199,galaxyS26: 899,galaxyS26Plus: 1099,galaxyS26Ultra: 1299,galaxyA17: 299,galaxyA36: 399,galaxyZflip7: 1099,galaxyZfold7: 1999, pixel10a: 499, pixel10: 799,pixel10Pro: 999, pixel10ProXl: 1199, motoG2026: 189,motogPlay2026: 139, motoGPower2026: 210,razr2025: 799,};
//watches and tablet prices we will leave as a constant since they never add new promotions for them 
const dataIneverSell = {appleWatchSE3: 10,appleWatchS11: 20,appleWatchUltra3: 40,galaxyWatch8: 10,galaxyTabA11: 20,iPadA16: 25,};

//internet pricing hasnt changed since ive worked there so we will leave it a constent.
const daInternet = {none: 0, rely: 30,amplified: 40,allin: 50,};



const experienceBeyondPricing = {1: 100,2: 170, 3: 215,4: 260, 5: 305,6: 350,};

//pricing with first responder , military and 55 discounts 
const experienceBeyondPricingW_Mil_55_FR = {1: 85, 2: 130, 3: 165,4: 200, 5: 235,6: 270,};

const experienceMorePricing = {1: 85,  2: 140,3: 170, 4: 200,5: 230,6: 260,};

const experienceMorePricingW_Mil_55_FR = {1: 70, 2: 100, 3: 120, 4: 140, 5: 160, 6: 180};

const essentials = { 1: 60, 2: 90, 3: 105, 4: 120,5: 135,6: 150,};

const essentialsW_Mil_55_FR = { 1: 45,2: 60, 3: 90,4: 100,5: 110,6: 120,};





function monthlyInterwebs(dainternetPlan) {
  const planKey = String(dainternetPlan || "").trim().toLowerCase();
  return daInternet[planKey] ?? 0;
}

function getPlan({ lineSegment, plan, numPhoneLines }) {
        const totalNumLines = Number(numPhoneLines) || 1;
        const segment = lineSegment.trim().toLowerCase();
        const planKey = plan.trim().toLowerCase();

        //determines whether there is a free line or not based on the segment and plan because only standard plan can get the discount of the 3rd line for free 
      let freeLine = 0;
        if (segment === "standard" && (planKey === "beyond" || planKey === "more")){
          if (totalNumLines>=3) freeLine = 1;}


      //determines number of paid lines after seeing if there are any free lines on the account
      const numPaidLines = Math.max(totalNumLines - freeLine, 1);

      //will calculate plan cost for beyond, more, and essentialsbased on segment/plan and num paid lines since free lines dont cost anything
      let cost=0;
      

      // if beyond plan 
      if (planKey === "beyond") {
            if (segment === "standard") {
              cost = experienceBeyondPricing[numPaidLines];} 
              else {
              cost = experienceBeyondPricingW_Mil_55_FR[totalNumLines];}}


            if (planKey === "more") {
            if (segment === "standard") {
              cost = experienceMorePricing[numPaidLines];} 
              else {
                cost = experienceMorePricingW_Mil_55_FR[totalNumLines];}}

          if (planKey === "essentials") {
            if (segment === "standard") {
              cost = essentials[numPaidLines];} 
              else {
                cost = essentialsW_Mil_55_FR[totalNumLines];}}

        return  {planMonthly: cost,  totalLines: totalNumLines, paidLines: numPaidLines, freeLines: freeLine, has3rdLineFree: freeLine === 1, planKey, };
      }




function getPromoCreditFromDb(lineItem, accountInfo, planInfo) {
  
          //pulls all promo from db then loops through them to see which one best fits for customer based on rules. then will return best promo
          const promos = db.prepare("SELECT * FROM promotions").all();

          //starts with no promo applied and a 0 dollar credit
          let bestPromo = {  promoName: "None",promoCredit: 0, };

          //loops through every promo in the db.
          for (let i=0; i <promos.length; i++) { 
            const promo = promos[i];

        let promoFailReason = "";
        //add a line requirment
        if (promo.requiresAAL == 1 && !lineItem.aal) {promoFailReason = "does not require AAL in the promo"; continue; } 

        //checks to see if they need to port number for promo 
          if (promo.requiresPort == 1 && !lineItem.isPort) { promoFailReason = "no port"; continue;}


        //checks to see if they need a trade for promo and then checks requirments based on the trade model and condition
        if (promo.requires_trade == 1){
              if(lineItem.tradeModel === "NA")
                {promoFailReason = "no trade in"; continue;}
               if (!lineItem.tradeModel || lineItem.tradeModel === "none")
                  {promoFailReason = "there was no trade model that was ever attached "; continue; }

                  
              if (promo.trade_condition == "GOOD"){
                    
                if (lineItem.tradeCondition !== "GOOD") { promoFailReason = "trade in condition was not good"; continue;}}}  
                    
              if (promo.eligible_new_devices) {
                        const eligibleDevices = JSON.parse(promo.eligible_new_devices);
                    if (!eligibleDevices.includes(lineItem.device)) continue;}

                          
              if (promo.required_plans) {
                  const requiredPlans = JSON.parse(promo.required_plans);
                  if (!requiredPlans.includes(planInfo.planKey)) continue;}

              if (promo.required_segments) {
                  const requiredSegments = JSON.parse(promo.required_segments);
                  if (!requiredSegments.includes(accountInfo.segment)) continue;
                          }
          

          let promoValue= 0; 

          //applies non trade promo credit if promo doesnt need any trade in 

              if (!promo.requires_trade)
              { promoValue = promo.max_payout;}
          //however if promo does require trade in it will check 
          // the tiers for said promo and see which tier fits based on the trade model then apply that max payout for the device
              else {
               const tiers = db
                  .prepare("SELECT * FROM trade_tiers WHERE promo_id = ?")
                  .all(promo.id);

                  for (const tier of tiers) {
                 const models = JSON.parse(tier.models);
        if (models.includes(lineItem.tradeModel)) {
          if (tier.payout > bestPromo.promoCredit) {   // fixed - was checking promoValue before
            bestPromo = { promoName: promo.name, promoCredit: tier.payout };
          }
        }
      }
      continue;
    }

    if (promoValue > bestPromo.promoCredit) {
      bestPromo = { promoName: promo.name, promoCredit: promoValue };
    }
  }

  return bestPromo;  
}  


function calculateQuote(input) {
   if (!Array.isArray(input.lineItems)){
    input.lineItems=[]; }
  const internetMonthly = monthlyInterwebs(input.dainternetPlan);
 

//cycles through each line and sees to checkl if there is all the info we need if not then it will just fill it with a default value
  const defaulttLines = []
  for (let i= 0; i < input.lineItems.length; i++)
  {

  const line = input.lineItems[i]; 
defaulttLines.push
    ({  lineNumber: i+ 1, itemType: line.itemType || "phone", device: line.device || "iphone17", tradeModel: line.tradeModel || "none", tradeCondition: line.tradeCondition || "GOOD", isPort: !!line.isPort, aal: line.aal !== false, insurance: !!line.insurance,}); 
  }



  


  const phoneLinesOnly = defaulttLines.filter(
    (line) => line.itemType === "phone"
  );

  const phoneLineCount = Math.max(1, phoneLinesOnly.length);

  const planInfo = getPlan({
    lineSegment: input.segment,
    plan: input.plan,
    numPhoneLines : phoneLineCount,
  });

  const normalizedLineItems = [];

  for (const lineItem of defaulttLines) {
    if (lineItem.itemType === "watch" || lineItem.itemType === "tablet") {
      const connectedMonthly = dataIneverSell[lineItem.device] ?? 0;
      const insuranceMonthly = lineItem.insurance ? theInsuranceThatIsAScamThroughAssurion : 0;

      normalizedLineItems.push({
        lineNumber: lineItem.lineNumber,
        itemType: lineItem.itemType,
        device: lineItem.device,
        deviceMsrp: 0,
        tradeModel: "no trade in",
        tradeCondition: "N/A",
        isPort: false,
        aal: lineItem.aal,
        insurance: lineItem.insurance,
        insuranceMonthly,
        promoName: "Connected Device Rate",
        promoCredit: 0,
        remainingDeviceBalance: 0,
        deviceMonthly: Number(connectedMonthly.toFixed(2)),
        lineMonthly: Number((connectedMonthly + insuranceMonthly).toFixed(2)),
      });

      continue;
    }

    const msrp = phonePrices[lineItem.device] ?? 0;

    const promoResult = getPromoCreditFromDb(
      lineItem,
      { segment: input.segment },
      planInfo
    );

    let remainingDeviceBalance =  msrp - promoResult.promoCredit; if (remainingDeviceBalance <0) { remainingDeviceBalance = 0; }
    const deviceMonthly = remainingDeviceBalance / months;
    const insuranceMonthly = lineItem.insurance ? theInsuranceThatIsAScamThroughAssurion : 0;

    normalizedLineItems.push({
      lineNumber: lineItem.lineNumber,
      itemType: lineItem.itemType,
      device: lineItem.device,
      deviceMsrp: msrp,
      tradeModel: lineItem.tradeModel,
      tradeCondition: lineItem.tradeCondition,
      isPort: lineItem.isPort,
      aal: lineItem.aal,
      insurance: lineItem.insurance,
      insuranceMonthly,
      promoName: promoResult.promoName,
      promoCredit: promoResult.promoCredit,
      remainingDeviceBalance: remainingDeviceBalance,
      deviceMonthly: Number(deviceMonthly.toFixed(2)),
      lineMonthly: Number((deviceMonthly + insuranceMonthly).toFixed(2)),
    });
  }

  let totalDeviceMonthly = 0 ;
  for (const line of normalizedLineItems) {
    totalDeviceMonthly += line.deviceMonthly;
  }


let totalInsuranceMonthly = 0;

for (const line of normalizedLineItems) {
  totalInsuranceMonthly += line.insuranceMonthly || 0;
}

  const monthlyTotal = planInfo.planMonthly + totalDeviceMonthly +  totalInsuranceMonthly + internetMonthly;

  return {
    breakdown: {
      segment: input.segment,
      plan: input.plan,
      planKey: planInfo.planKey,
      totalLines: planInfo.totalLines,
      paidLines: planInfo.paidLines,
      freeLines: planInfo.freeLines,
      has3rdLineFree: planInfo.has3rdLineFree,
      planMonthly: planInfo.planMonthly,
      lineItems: normalizedLineItems,
      totalDeviceMonthly: Number(totalDeviceMonthly.toFixed(2)),
      totalInsuranceMonthly: Number(totalInsuranceMonthly.toFixed(2)),
      dainternetPlan: input.dainternetPlan || "none",
      internetMonthly,
    },
    monthlyTotal: Number(monthlyTotal.toFixed(2)),
  };
}

module.exports = { calculateQuote, phonePrices}; 
