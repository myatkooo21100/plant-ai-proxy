export default async function handler(req, res) {
  // CORS (App ကနေ လှမ်းခေါ်ရင် လက်ခံအောင် ဖွင့်ပေးခြင်း)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Preflight Request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 🔥 သင့် Gemini API Key ကို ဒီနေရာမှာ ထည့်ပါ
  const API_KEY = "AIzaSyDlDf_q7LtdCgL2cZcCBLWwhKfKommodqo";
  
  const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(googleUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}