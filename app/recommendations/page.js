export default function Recommendations() {
  return (
    <div>
      <h1>AI Recommendations</h1>
      <p>Tell us your preferences to get personalized matches.</p>
      
      <form>
        <div>
          <label>City</label>
          <input type="text" placeholder="Enter city" />
        </div>
        <div>
          <label>Monthly Budget</label>
          <input type="text" placeholder="e.g., $1500" />
        </div>
        <div>
          <label>Bedrooms</label>
          <select>
            <option>Studio</option>
            <option>1 Bedroom</option>
            <option>2 Bedrooms</option>
            <option>3+ Bedrooms</option>
          </select>
        </div>
        <button type="submit">Get Recommendations</button>
      </form>
    </div>
  );
}