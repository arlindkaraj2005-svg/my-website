// api/submitform.js
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { name, email, phone, message } = req.body;

  // ✅ Logs will appear in Vercel functions logs
  console.log("📩 NEW FORCE RECOVERY SUBMISSION");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Phone:", phone);
  console.log("Message:", message);

  return res.status(200).json({
    success: true,
    message: "✅ Your request has been submitted successfully."
  });
};