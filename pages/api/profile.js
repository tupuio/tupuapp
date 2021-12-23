export default function handler(req, res) {
  res.status(200).json({
    name: "Madalina",
    email: "madalina@tupu.io",
    bio: "A start for the bio.",
  });
}
