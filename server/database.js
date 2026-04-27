const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "quotetool.db");
const db = new Database(dbPath);



//promotions table schema to see what type of data each column hold
db.exec(`CREATE TABLE IF NOT EXISTS promotions (id TEXT PRIMARY KEY, 
  name TEXT, requires_trade INTEGER, 
  requiresAAL INTEGER,
     requiresPort INTEGER,
     trade_condition TEXT,
     max_payout INTEGER,
      eligible_new_devices TEXT, required_plans TEXT,
       required_segments TEXT );



  CREATE TABLE IF NOT EXISTS trade_tiers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    promo_id TEXT,
    payout INTEGER,
    models TEXT
  );
`);

//searches for the promotion by the id number and gets promotion if it exists 

function promoExists(id) {
  return db.prepare("SELECT * FROM promotions WHERE id = ?").get(id);
}



// ID260107
//if the promotions does not exist then insert that jawn into the database 

if (!promoExists("ID260107")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
  `).run(
    "ID260107",
    "DB TEST PROMO",
    1,
    1,
    0,
    "GOOD",
    830,
    JSON.stringify([
      "iphone17",
      "iphone17pro",
      "iphone17promax",
      "iphone16",
      "iphone15"
    ]),
    JSON.stringify(["beyond", "more"]),
    JSON.stringify(["Standard"])
  );

  db.prepare(`
    INSERT INTO trade_tiers (promo_id, payout, models)
    VALUES (?, ?, ?)
  `).run(
    "ID260107",
    830,
    JSON.stringify([
      "iphone13",
      "iphone13mini",
      "iphone13pro",
      "iphone13promax",
      "iphone14",
      "iphone14plus",
      "iphone14pro",
      "iphone14promax",
      "iphone15",
      "iphone15plus",
      "iphone15pro",
      "iphone15promax",
      "iphone16e",
      "iphone16",
      "iphone16plus",
      "iphone16pro",
      "iphone16promax"
    ])
  );

  db.prepare(`
    INSERT INTO trade_tiers (promo_id, payout, models)
    VALUES (?, ?, ?)
  `).run(
    "ID260107",
    400,
    JSON.stringify([
      "iphone11",
      "iphone11pro",
      "iphone11promax",
      "iphone12",
      "iphone12mini",
      "iphone12pro",
      "iphone12promax",
      "iphonex",
      "iphonexr",
      "iphonexs",
      "iphonexsmax",
      "iphone8",
      "iphone8plus",
      "iphone7",
      "iphone7plus",
      "iphone6",
      "iphone6plus",
      "iphone6s",
      "iphone6splus",
      "iphoneSE1",
      "iphoneSE2",
      "iphoneSE3"
    ])
  );

  console.log("ID260107");
}

if (!promoExists("ID250567")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID250567",
    "$300 Off iPhone 17 (Trade + AAL, Essentials Only)",
    1,              
    1,             
    0,              
    "GOOD",
    300,
    JSON.stringify(["iphone17","iphone17plus","iphone17pro","iphone17promax","iphone16","iphone16plus","iphone16pro","iphone16promax"]),
    JSON.stringify(["essentials"]),
    JSON.stringify(["Standard"])
  );

  db.prepare(`INSERT INTO trade_tiers (promo_id, payout, models) VALUES (?, ?, ?)`).run("ID250567", 300, JSON.stringify(["iphone13pro","iphone13promax","iphone14","iphone14plus","iphone14pro","iphone14promax","iphone15","iphone15plus","iphone15pro","iphone15promax","iphone16","iphone16plus","iphone16pro","iphone16promax","iphone12pro","iphone12promax"]));

  db.prepare(`INSERT INTO trade_tiers (promo_id, payout, models) VALUES (?, ?, ?)`).run("ID250567", 150, JSON.stringify(["iphone6","iphone7","iphone8","iphonex","iphonexr","iphonexs","iphonexsmax","iphone11","iphone11pro","iphone11promax","iphone12","iphone12mini","iphoneSE2","iphoneSE3"]));

  console.log("ID250567");
}











// ID260106
if (!promoExists("ID260106")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID260106",
    "$630 Off iPhone 17 Apple iPhone Promo with New Line",
    1,
    1,
    0,
    "GOOD",
    630,
    JSON.stringify([
      "iphone17",
      "iphone17pro",
      "iphone17promax",
      "iphone16",
      "iphone16pro",
      "iphone16promax",
      "iphone15",
      "iphone15plus"
    ]),
    JSON.stringify(["beyond", "more"]),
    JSON.stringify(["MIL_FR_55"])
  );

  db.prepare(`
    INSERT INTO trade_tiers (promo_id, payout, models)
    VALUES (?, ?, ?)
  `).run(
    "ID260106",
    630,
    JSON.stringify([
      "iphone13",
      "iphone13mini",
      "iphone13pro",
      "iphone13promax",
      "iphone14",
      "iphone14plus",
      "iphone14pro",
      "iphone14promax",
      "iphone15",
      "iphone15plus",
      "iphone15pro",
      "iphone15promax",
      "iphone16e",
      "iphone16",
      "iphone16plus",
      "iphone16pro",
      "iphone16promax"
    ])
  );

  db.prepare(`
    INSERT INTO trade_tiers (promo_id, payout, models)
    VALUES (?, ?, ?)
  `).run(
    "ID260106",
    300,
    JSON.stringify([
      "iphone11",
      "iphone11pro",
      "iphone11promax",
      "iphone12",
      "iphone12mini",
      "iphone12pro",
      "iphone12promax",
      "iphonex",
      "iphonexr",
      "iphonexs",
      "iphonexsmax",
      "iphone8",
      "iphone8plus",
      "iphone7",
      "iphone7plus",
      "iphone6",
      "iphone6plus",
      "iphone6s",
      "iphone6splus",
      "iphoneSE1",
      "iphoneSE2",
      "iphoneSE3"
    ])
  );

  console.log("ID260106");
}

// ID250513
if (!promoExists("ID250513")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID250513",
    "iPhone 17e (Port + New Line)",
    0,
    1,
    1,
    null,
    630,
    JSON.stringify([
      "iphone17e",
      "iphone16e",
      "iphone15"
    ]),
    JSON.stringify(["beyond", "more", "essentials"]),
    JSON.stringify(["Standard", "MIL_FR_55"])
  );

  console.log("ID250513");
}

// ID250512
if (!promoExists("ID250512")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID250512",
    "50% off iPhone 15",
    0,
    1,
    0,
    null,
    315,
    JSON.stringify([
      "iphone15",
      "iphone14"
    ]),
    JSON.stringify(["beyond", "more", "essentials"]),
    JSON.stringify(["Standard", "MIL_FR_55"])
  );

  console.log("ID250512");
}

// ID250985
if (!promoExists("ID250985")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID250985",
    "Iphone 17 On US (AAL + Port)",
    0, 1, 1, null, 830,
    JSON.stringify([
      "iphone17",
      "iphone17pro",
      "iphone17promax",
      "iphone16"
    ]),
    JSON.stringify(["beyond", "more"]),
    JSON.stringify(["Standard"])
  );

  console.log(" ID250985");
}

// ID250983
if (!promoExists("ID250983")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID250983",
    "$630 off iphone17 (AAL + Port), ID250983",
    0, 1, 1, null, 630,
    JSON.stringify([
      "iphone17",
      "iphone17pro",
      "iphone17promax",
      "iphone16"
    ]),
    JSON.stringify(["beyond", "more"]),
    JSON.stringify(["MIL_FR_55"])
  );

  console.log("ID250983");
}

// ID250069
if (!promoExists("ID250069")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID250069",
    "Samsung Galaxy S26 on Us (AAL), ID250069",
    0, 1, 0, null, 899,
    JSON.stringify([
      "GalaxyS26",
      "GalaxyS26Plus",
      "GalaxyS26Ultra"
    ]),
    JSON.stringify(["beyond", "more"]),
    JSON.stringify(["MIL_FR_55", "Standard"])
  );

  console.log("ID250069");
}

// ID250681
if (!promoExists("ID250681")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID250681",
    "Samsung Z Flip 7 on us, ID250681",
    0, 1, 0, null, 1100,
    JSON.stringify([
      "GalaxyZflip7",
      "GalaxyZfold7"
    ]),
    JSON.stringify(["beyond"]),
    JSON.stringify(["Standard", "MIL_FR_55"])
  );

  console.log("ID250681");
}

// ID250980
if (!promoExists("ID250980")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID250980",
    "Google Pixel 10 Pro XL on Us, ID250980",
    0, 1, 0, null, 1200,
    JSON.stringify([
      "Pixel10ProXl",
      "Pixel10Pro",
      "Pixel10a",
      "Pixel10"
    ]),
    JSON.stringify(["beyond"]),
    JSON.stringify(["Standard", "MIL_FR_55"])
  );

  console.log("ID250980");
}


if (!promoExists("ID250820")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID250820",
    "Moto Razr+ on Us, ID250820",
    0, 1, 0, null, 799,
    JSON.stringify([
      "Razr2025"
    ]),
    JSON.stringify(["beyond", "more"]),
    JSON.stringify(["Standard", "MIL_FR_55"])
  );

  console.log("ID250820");
}




// ID250990
if (!promoExists("ID250990")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID250990",
    "Google Pixel 10 Pro XL on Us, ID250990",
    0, 1, 0, null, 1000,
    JSON.stringify([
      "Pixel10ProXl",
      "Pixel10Pro",
      "Pixel10a",
      "Pixel10"
    ]),
    JSON.stringify(["beyond", "more"]),
    JSON.stringify(["Standard", "MIL_FR_55"])
  );

  console.log("ID250990");
}

// ID250689
if (!promoExists("ID250689")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID250689",
    "Samsung Galaxy S26 on Us (AAL + Port on essentials), ID250689",
    0, 1, 1, null, 899,
    JSON.stringify([
      "GalaxyS26",
      "GalaxyS26Plus",
      "GalaxyS26Ultra"
    ]),
    JSON.stringify(["essentials"]),
    JSON.stringify(["Standard"])
  );

  console.log("ID250689");
}

// ID260010
if (!promoExists("ID260010")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID260010",
    "$600 off of Android Smartphones (essentials, no port, yes AAL), ID260010",
    0, 1, 0, null, 600,
    JSON.stringify([
      "GalaxyS26",
      "GalaxyS26Plus",
      "GalaxyS26Ultra",
      "GalaxyZflip7",
      "GalaxyZfold7",
      "Pixel10ProXl",
      "Pixel10Pro",
      "Pixel10a",
      "Pixel10",
      "Razr2025"
    ]),
    JSON.stringify(["essentials"]),
    JSON.stringify(["Standard"])
  );

  console.log("ID260010");
}

// ID250176
if (!promoExists("ID250176")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID250176",
    "$A17 on us (AAL), ID250176",
    0, 1, 0, null, 299,
    JSON.stringify([
      "GalaxyA17"
    ]),
    JSON.stringify(["essentials"]),
    JSON.stringify(["Standard"])
  );

  console.log("ID250176");
}


if (!promoExists("ID250975")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID250975",
    "Samsung Galaxy S26+ On Us (Trade, Good Condition), ID250975",
    1, 0, 0, "GOOD", 1099,
    JSON.stringify([ "GalaxyS26Plus"]),
    JSON.stringify(["beyond"]),
    JSON.stringify(["Standard", "MIL_FR_55"])
  );

  
  db.prepare(`
    INSERT INTO trade_tiers (promo_id, payout, models)
    VALUES (?, ?, ?)
  `).run(
    "ID250975",
    1099,
    JSON.stringify([
      "GalaxyS10","GalaxyS10e","GalaxyS10Plus","GalaxyS105G",
      "GalaxyS20","GalaxyS20FE","GalaxyS20Plus","GalaxyS20Ultra",
      "GalaxyS21","GalaxyS21FE","GalaxyS21Plus","GalaxyS21Ultra",
      "GalaxyS22","GalaxyS22Plus","GalaxyS22Ultra",
      "GalaxyS23","GalaxyS23FE","GalaxyS23Plus","GalaxyS23Ultra",
      "GalaxyS24","GalaxyS24FE","GalaxyS24Plus","GalaxyS24Ultra",
      "GalaxyS25","GalaxyS25Plus","GalaxyS25Edge","GalaxyS25Ultra",
      "GalaxyZFlip3","GalaxyZFlip4","GalaxyZFlip5","GalaxyZFlip6",
      "GalaxyZFold3","GalaxyZFold4","GalaxyZFold5","GalaxyZFold6",
      "GalaxyNote9","GalaxyNote10","GalaxyNote10Plus","GalaxyNote10Lite",
      "GalaxyNote20","GalaxyNote20Ultra",
      "Pixel6","Pixel6Pro","Pixel7","Pixel7Pro","Pixel8","Pixel8Pro",
      "Pixel9","Pixel9Pro","Pixel9XL","Pixel9Fold",
      "OnePlus9Pro5G","OnePlus10Pro5G",
      "RazrPlus2023","RazrPlus2024",
      "iphone12pro","iphone12promax",
      "iphone13","iphone13mini","iphone13pro","iphone13promax",
      "iphone14","iphone14plus","iphone14pro","iphone14promax",
      "iphone15","iphone15plus","iphone15pro","iphone15promax",
      "iphone16","iphone16plus","iphone16pro","iphone16promax","iphone16e"
    ])
  );


  db.prepare(`
    INSERT INTO trade_tiers (promo_id, payout, models)
    VALUES (?, ?, ?)
  `).run(
    "ID250975",
    500,
    JSON.stringify([
      "GalaxyS6","GalaxyS6Edge","GalaxyS6EdgePlus",
      "GalaxyS7","GalaxyS7Edge","GalaxyS7Active",
      "GalaxyS8","GalaxyS8Plus","GalaxyS8Active",
      "GalaxyS9","GalaxyS9Plus",
      "GalaxyNote8",
      "GalaxyA145G","GalaxyA155G","GalaxyA21","GalaxyA23",
      "GalaxyA32","GalaxyA325G","GalaxyA35",
      "GalaxyA51","GalaxyA515G","GalaxyA52","GalaxyA525G",
      "GalaxyA535G","GalaxyA545G","GalaxyA71","GalaxyA715G",
      "GalaxyZFold","GalaxyZFold2","GalaxyZFlip","GalaxyZFlip5G",
      "Pixel4","Pixel4XL","Pixel4a5G","Pixel5a5G","Pixel6a","Pixel7a","Pixel8a",
      "OnePlus7Pro5G","OnePlus7TPro","OnePlus8T5G","OnePlus8Plus5G",
      "OnePlus8Pro5G","OnePlus95G","OnePlus10T5G",
      "Razr2024","Razr405G","Razr40Ultra",
      "MotoEdge5G2022","MotoEdge5G2023","MotoEdge5G2024",
      "LGV60ThinQ",
      "iphone6","iphone6plus","iphone6s","iphone6splus",
      "iphone7","iphone7plus","iphone8","iphone8plus",
      "iphonex","iphonexr","iphonexs","iphonexsmax",
      "iphone11","iphone11pro","iphone11promax",
      "iphone12","iphone12mini",
      "iphoneSE2","iphoneSE3"
    ])
  );

  console.log("ID250975");
}



// ID260096
if (!promoExists("ID260096")) {
  db.prepare(`
    INSERT INTO promotions (
      id, name, requires_trade, requiresAAL, requiresPort, trade_condition,
      max_payout, eligible_new_devices, required_plans, required_segments
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    "ID260096",
    "Iphone 17 Pro on US (Trade, Good Condition), ID260096",
    1,
    1,
    0,
    "GOOD",
    1100,
    JSON.stringify([
      "iphone17",
      "iphone17pro",
      "iphone17promax",
      "iphone16",
      "iphone15"
    ]),
    JSON.stringify(["beyond"]),
    JSON.stringify(["Standard"])
  );

  db.prepare(`
    INSERT INTO trade_tiers (promo_id, payout, models)
    VALUES (?, ?, ?)
  `).run(
    "ID260096",
    1100,
    JSON.stringify([
      "iphone13pro",
      "iphone13promax",
      "iphone14",
      "iphone14plus",
      "iphone14pro",
      "iphone14promax",
      "iphone15",
      "iphone15plus",
      "iphone15pro",
      "iphone15promax",
      "iphone16e",
      "iphone16",
      "iphone16plus",
      "iphone16pro",
      "iphone16promax"
    ])
  );

  db.prepare(`
    INSERT INTO trade_tiers (promo_id, payout, models)
    VALUES (?, ?, ?)
  `).run(
    "ID260096",
    830,
    JSON.stringify([
      "iphone13pro",
      "iphone13promax",
      "iphone14",
      "iphone14plus",
      "iphone14pro",
      "iphone14promax",
      "iphone15",
      "iphone15plus",
      "iphone15pro",
      "iphone15promax",
      "iphone16e",
      "iphone16",
      "iphone16plus",
      "iphone16pro",
      "iphone16promax"
    ])
  );

  console.log("ID260096");
}



module.exports = db;

