export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const API_KEY = process.env.GEMINI_API_KEY; // Dashboard မှာ ထည့်ထားတဲ့ Key ကို ယူမယ်
  const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(googleUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    // Google က Error ပြန်လာရင် App ဆီ တိုက်ရိုက် ပို့ပေးမယ်
    if (data.error) {
        return res.status(200).json({ 
            status: "google_error", 
            message: data.error.message 
        });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: "proxy_error", message: error.message });
  }
}
