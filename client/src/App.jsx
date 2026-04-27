import { useEffect, useState } from "react";
import "./App.css";

function createLineItem(lineNumber) {
  return {
    lineNumber,
    itemType: "phone",
    device: "iphone17",
    tradeModel: "none",
    tradeCondition: "GOOD",
    isPort: false,
    aal: true,
    insurance: false,
  };
}

function App() {
  const [segment, setSegment] = useState("Standard");
  const [plan, setPlan] = useState("Beyond");
  const [lines, setLines] = useState(1);
  const [dainternetPlan, setDainternetPlan] = useState("none");

  const [lineItems, setLineItems] = useState([createLineItem(1)]);

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    setLineItems((prev) => {
      const next = [...prev];

      while (next.length < lines) {
        next.push(createLineItem(next.length + 1));
      }

      while (next.length > lines) {
        next.pop();
      }

      return next.map((line, index) => ({
        ...line,
        lineNumber: index + 1,
      }));
    });
  }, [lines]);

  function updateLineItem(index, field, value) {
    setLineItems((prev) =>
      prev.map((line, i) => {
        if (i !== index) return line;

        if (field === "itemType") {
          let nextDevice = "iphone17";

          if (value === "watch") nextDevice = "AppleWatchSE3";
          if (value === "tablet") nextDevice = "GalaxyTabA11";

          return {
            ...line,
            itemType: value,
            device: nextDevice,
            tradeModel: "none",
            tradeCondition: "GOOD",
            isPort: false,
            insurance: false,
          };
        }

        return {
          ...line,
          [field]: value,
        };
      })
    );
  }

  useEffect(() => {
    let cancelled = false;

    async function fetchQuote() {
      setLoading(true);
      setServerError("");

      try {
        const res = await fetch("/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            segment,
            plan,
            lines,
            lineItems,
            dainternetPlan,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Server error");
        }

        if (!cancelled) {
          setQuote(data);
        }
      } catch (err) {
        if (!cancelled) {
          setServerError(err?.message || "Failed to fetch quote");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchQuote();

    return () => {
      cancelled = true;
    };
  }, [segment, plan, lines, lineItems, dainternetPlan]);

  return (
    <div className="container">
      <h1 className="page-title">Quote Tool</h1>

      <div className="app-layout">
        <div className="left-column">
          <div className="panel">
            <h2>Account Details</h2>

            <label>Customer Type</label>
            <select value={segment} onChange={(e) => setSegment(e.target.value)}>
              <option value="Standard">Standard</option>
              <option value="MIL_FR_55">Military / FR / 55+</option>
            </select>

            <label>Plan</label>
            <select value={plan} onChange={(e) => setPlan(e.target.value)}>
              <option value="Beyond">Beyond</option>
              <option value="More">More</option>
              <option value="Essentials">Essentials</option>
            </select>

            <label>Lines</label>
            <input
              type="number"
              min="1"
              max="6"
              value={lines}
              onChange={(e) => setLines(Number(e.target.value))}
            />

            <label>Internet</label>
            <select
              value={dainternetPlan}
              onChange={(e) => setDainternetPlan(e.target.value)}
            >
              <option value="none">No Internet</option>
              <option value="rely">Internet $30</option>
              <option value="amplified">Internet $40</option>
              <option value="allin">Internet $50</option>
            </select>
          </div>

          {lineItems.map((line, index) => (
            <div className="panel line-panel" key={line.lineNumber}>
              <h2>Line {line.lineNumber}</h2>

              <label>Item Type</label>
              <select
                value={line.itemType}
                onChange={(e) => updateLineItem(index, "itemType", e.target.value)}
              >
                <option value="phone">Phone</option>
                <option value="watch">Watch</option>
                <option value="tablet">Tablet</option>
              </select>

              <label>Device</label>
              <select
                value={line.device}
                onChange={(e) => updateLineItem(index, "device", e.target.value)}
              >
                {line.itemType === "phone" && (
                  <>
                    <option value="iphone15">iPhone 15</option>
                    <option value="iphone16">iPhone 16</option>
                    <option value="iphone16e">iPhone 16e</option>
                    <option value="iphone17">iPhone 17</option>
                    <option value="iphone17pro">iPhone 17 Pro</option>
                    <option value="iphone17promax">iPhone 17 Pro Max</option>
                    <option value="GalaxyA17">Galaxy A17</option>
                    <option value="GalaxyS26">Galaxy S26</option>
                    <option value="GalaxyS26Plus">Galaxy S26 Plus</option>
  
                    <option value="GalaxyS26Ultra">Galaxy S26 Ultra</option>
                    <option value="GalaxyZflip7">Galaxy Z Flip 7</option>
                    <option value="GalaxyZfold7">Galaxy Z Fold 7</option>
                    <option value="Pixel10ProXl">Pixel 10 Pro XL</option>
                    <option value="Pixel10Pro">Pixel 10 Pro</option>
                    <option value="Pixel10">Pixel 10</option>
                    <option value="Pixel10a">Pixel 10a</option>
                    <option value="Razr2025">Moto Razr2025</option>
                  </>
                )}

                {line.itemType === "watch" && (
                  <>
                    <option value="AppleWatchSE3">Apple Watch SE3</option>
                    <option value="AppleWatchS11">Apple Watch S11</option>
                    <option value="AppleWatchUltra3">Apple Watch Ultra 3</option>
                    <option value="GalaxyWatch8">Galaxy Watch 8</option>
                  </>
                )}

                {line.itemType === "tablet" && (
                  <>
                    <option value="GalaxyTabA11">Galaxy Tab A11</option>
                    <option value="iPadA16">iPad A16</option>
                  </>
                )}
              </select>

              <label>Insurance</label>
              <select
                value={String(line.insurance)}
                onChange={(e) =>
                  updateLineItem(index, "insurance", e.target.value === "true")
                }
              >
                <option value="false">No Insurance</option>
                <option value="true">Add Insurance ($18/mo)</option>
              </select>

              {line.itemType === "phone" && (
                <>
                  <label>Port In?</label>
                  <select
                    value={String(line.isPort)}
                    onChange={(e) =>
                      updateLineItem(index, "isPort", e.target.value === "true")
                    }
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>

                  <label>Trade Model</label>
                  <select
                    value={line.tradeModel}
                    onChange={(e) =>
                      updateLineItem(index, "tradeModel", e.target.value)
                    }
                  >
                    <option value="none">No Trade In</option>

                    <option value="iphone13">iPhone 13</option>
                    <option value="iphone13mini">iPhone 13 Mini</option>
                    <option value="iphone13pro">iPhone 13 Pro</option>
                    <option value="iphone13promax">iPhone 13 Pro Max</option>

                    <option value="iphone14">iPhone 14</option>
                    <option value="iphone14plus">iPhone 14 Plus</option>
                    <option value="iphone14pro">iPhone 14 Pro</option>
                    <option value="iphone14promax">iPhone 14 Pro Max</option>

                    <option value="iphone15">iPhone 15</option>
                    <option value="iphone15plus">iPhone 15 Plus</option>
                    <option value="iphone15pro">iPhone 15 Pro</option>
                    <option value="iphone15promax">iPhone 15 Pro Max</option>

                    <option value="iphone16e">iPhone 16e</option>
                    <option value="iphone16">iPhone 16</option>
                    <option value="iphone16plus">iPhone 16 Plus</option>
                    <option value="iphone16pro">iPhone 16 Pro</option>
                    <option value="iphone16promax">iPhone 16 Pro Max</option>

                    <option value="galaxys10">Galaxy S10</option>
                    <option value="galaxys10e">Galaxy S10e</option>
                    <option value="galaxys10plus">Galaxy S10+</option>
                    <option value="galaxys105g">Galaxy S10 5G</option>

                    <option value="galaxys20">Galaxy S20</option>
                    <option value="galaxys20fe">Galaxy S20 FE</option>
                    <option value="galaxys20plus">Galaxy S20+</option>
                    <option value="galaxys20ultra">Galaxy S20 Ultra</option>

                    <option value="galaxys21">Galaxy S21</option>
                    <option value="galaxys21fe">Galaxy S21 FE</option>
                    <option value="galaxys21plus">Galaxy S21+</option>
                    <option value="galaxys21ultra">Galaxy S21 Ultra</option>

                    <option value="galaxys22">Galaxy S22</option>
                    <option value="galaxys22plus">Galaxy S22+</option>
                    <option value="galaxys22ultra">Galaxy S22 Ultra</option>

                    <option value="galaxys23">Galaxy S23</option>
                    <option value="galaxys23fe">Galaxy S23 FE</option>
                    <option value="galaxys23plus">Galaxy S23+</option>
                    <option value="galaxys23ultra">Galaxy S23 Ultra</option>

                    <option value="galaxys24">Galaxy S24</option>
                    <option value="galaxys24fe">Galaxy S24 FE</option>
                    <option value="galaxys24plus">Galaxy S24+</option>
                    <option value="galaxys24ultra">Galaxy S24 Ultra</option>

                    <option value="galaxys25">Galaxy S25</option>
                    <option value="galaxys25plus">Galaxy S25+</option>
                    <option value="galaxys25ultra">Galaxy S25 Ultra</option>
                    <option value="galaxys25edge">Galaxy S25 Edge</option>

                    <option value="galaxynote9">Galaxy Note 9</option>
                    <option value="galaxynote10">Galaxy Note 10</option>
                    <option value="galaxynote10plus">Galaxy Note 10+</option>
                    <option value="galaxynote10lite">Galaxy Note 10 Lite</option>
                    <option value="galaxynote20">Galaxy Note 20</option>
                    <option value="galaxynote20ultra">Galaxy Note 20 Ultra</option>

                    <option value="galaxyzflip3">Galaxy Z Flip 3</option>
                    <option value="galaxyzflip4">Galaxy Z Flip 4</option>
                    <option value="galaxyzflip5">Galaxy Z Flip 5</option>
                    <option value="galaxyzflip6">Galaxy Z Flip 6</option>
                    <option value="galaxyzflip7">Galaxy Z Flip 7</option>

                    <option value="galaxyzfold3">Galaxy Z Fold 3</option>
                    <option value="galaxyzfold4">Galaxy Z Fold 4</option>
                    <option value="galaxyzfold5">Galaxy Z Fold 5</option>
                    <option value="galaxyzfold6">Galaxy Z Fold 6</option>
                    <option value="galaxyzfold7">Galaxy Z Fold 7</option>

                    <option value="pixel4">Pixel 4</option>
                    <option value="pixel4xl">Pixel 4 XL</option>
                    <option value="pixel4a5g">Pixel 4a 5G</option>
                    <option value="pixel5a5g">Pixel 5a 5G</option>
                    <option value="pixel6">Pixel 6</option>
                    <option value="pixel6pro">Pixel 6 Pro</option>
                    <option value="pixel6a">Pixel 6a</option>
                    <option value="pixel7">Pixel 7</option>
                    <option value="pixel7pro">Pixel 7 Pro</option>
                    <option value="pixel7a">Pixel 7a</option>
                    <option value="pixel8">Pixel 8</option>
                    <option value="pixel8pro">Pixel 8 Pro</option>
                    <option value="pixel8a">Pixel 8a</option>
                    <option value="pixel9">Pixel 9</option>
                    <option value="pixel9pro">Pixel 9 Pro</option>
                    <option value="pixel9xl">Pixel 9 XL</option>
                    <option value="pixel9fold">Pixel 9 Fold</option>
                    <option value="pixel9a">Pixel 9a</option>

                    <option value="oneplus9pro">OnePlus 9 Pro</option>
                    <option value="oneplus10pro">OnePlus 10 Pro</option>

                    <option value="motorizr2025">Moto Razr 2025</option>
                    <option value="motorazrplus2023">Moto Razr+ 2023</option>
                    <option value="motorazrplus2024">Moto Razr+ 2024</option>
                    <option value="motorazrplus2025">Moto Razr+ 2025</option>
                    <option value="motorazrultra2025">Moto Razr Ultra 2025</option>

                    <option value="iphone11">iPhone 11</option>
                    <option value="iphone11pro">iPhone 11 Pro</option>
                    <option value="iphone11promax">iPhone 11 Pro Max</option>
                    <option value="iphone12">iPhone 12</option>
                    <option value="iphone12mini">iPhone 12 Mini</option>
                    <option value="iphone12pro">iPhone 12 Pro</option>
                    <option value="iphone12promax">iPhone 12 Pro Max</option>
                    <option value="iphonex">iPhone X</option>
                    <option value="iphonexr">iPhone XR</option>
                    <option value="iphonexs">iPhone XS</option>
                    <option value="iphonexsmax">iPhone XS Max</option>
                    <option value="iphone8">iPhone 8</option>
                    <option value="iphone8plus">iPhone 8+</option>
                    <option value="iphone7">iPhone 7</option>
                    <option value="iphone7plus">iPhone 7+</option>
                    <option value="iphone6">iPhone 6</option>
                    <option value="iphone6plus">iPhone 6+</option>
                    <option value="iphone6s">iPhone 6s</option>
                    <option value="iphone6splus">iPhone 6s+</option>
                    <option value="iphoneSE1">iPhone SE (1st gen)</option>
                    <option value="iphoneSE2">iPhone SE (2nd gen)</option>
                    <option value="iphoneSE3">iPhone SE (3rd gen)</option>

                    <option value="galaxys8">Galaxy S8</option>
                    <option value="galaxys8plus">Galaxy S8+</option>
                    <option value="galaxys8active">Galaxy S8 Active</option>
                    <option value="galaxys9">Galaxy S9</option>
                    <option value="galaxys9plus">Galaxy S9+</option>
                    <option value="galaxynote8">Galaxy Note 8</option>
                  </select>

                  <label>Trade Condition</label>
                  <select
                    value={line.tradeCondition}
                    onChange={(e) =>
                      updateLineItem(index, "tradeCondition", e.target.value)
                    }
                  >
                    <option value="GOOD">Good Condition</option>
                    <option value="NOT_GOOD">Not Good</option>
                  </select>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="right-column">
          <div className="panel quote-panel">
            <h2>Quote Breakdown</h2>

            {serverError && (
              <p className="error-text">
                <b>Error:</b> {serverError}
              </p>
            )}

            {loading && <p>Calculating...</p>}

            {!loading && quote?.breakdown && (
              <>
                <div className="summary-grid">
                  <div className="summary-card">
                    <span className="summary-label">Plan Monthly</span>
                    <span className="summary-value">
                      ${quote.breakdown.planMonthly}
                    </span>
                  </div>

                  <div className="summary-card">
                    <span className="summary-label">Total Phone Lines</span>
                    <span className="summary-value">
                      {quote.breakdown.totalLines}
                    </span>
                  </div>

                  <div className="summary-card">
                    <span className="summary-label">Paid Phone Lines</span>
                    <span className="summary-value">
                      {quote.breakdown.paidLines}
                    </span>
                  </div>

                  <div className="summary-card">
                    <span className="summary-label">Free Phone Lines</span>
                    <span className="summary-value">
                      {quote.breakdown.freeLines}
                    </span>
                  </div>
                </div>

                <hr />

                <h3 className="section-title">Per-Line Details</h3>

                {quote.breakdown.lineItems?.map((line) => (
                  <div key={line.lineNumber} className="quote-line-card">
                    <p><b>Line {line.lineNumber}</b></p>
                    <p>Type: {line.itemType}</p>
                    <p>Device: {line.device}</p>

                    {line.itemType === "phone" ? (
                      <>
                        <p>MSRP: ${line.deviceMsrp}</p>
                        <p>Trade In: {line.tradeModel}</p>
                        <p>Condition: {line.tradeCondition}</p>
                        <p>Port In: {line.isPort ? "Yes" : "No"}</p>
                        <p>Insurance: {line.insurance ? "Yes" : "No"}</p>
                        <p>Insurance Monthly: ${line.insuranceMonthly}</p>
                        <p>Promo: {line.promoName}</p>
                        <p>Promo Credit: ${line.promoCredit}</p>
                        <p>Remaining Balance: ${line.remainingDeviceBalance}</p>
                        <p>Device Monthly: ${line.deviceMonthly}</p>
                        <p><b>Line Monthly: ${line.lineMonthly}</b></p>
                      </>
                    ) : (
                      <>
                        <p>Rate Type: Connected Device Line</p>
                        <p>Insurance: {line.insurance ? "Yes" : "No"}</p>
                        <p>Insurance Monthly: ${line.insuranceMonthly}</p>
                        <p>Monthly Charge: ${line.deviceMonthly}</p>
                        <p><b>Line Monthly: ${line.lineMonthly}</b></p>
                      </>
                    )}
                  </div>
                ))}

                <hr />

                <p><b>Total Device Monthly:</b> ${quote.breakdown.totalDeviceMonthly}</p>
                <p><b>Total Insurance Monthly:</b> ${quote.breakdown.totalInsuranceMonthly}</p>
                <p><b>Internet Monthly:</b> ${quote.breakdown.internetMonthly}</p>
                <h2 className="total">Monthly Total: ${quote.monthlyTotal}</h2>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;