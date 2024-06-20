async function captcha(req, res, next) {
  const { recaptcha } = req.body;

  if (!recaptcha) {
    console.log("Captcha is missing.");
    return res.status(400).json({ error: 'Captcha is required' });
  }

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${recaptcha}`,
    {
      method: "POST",
    }
  );

  const data = await response.json();
  console.log(data);

  if (!data.success) {
    const error = new Error(data["error-codes"][0]);
    return next(error);
  }

  next();
}

export default captcha;
