async function getDateTime(req, res) {
  try {
    const date = new Date();
    const datetime = `${date.getHours()}:${date.getMinutes()}:${date
      .getSeconds()
      .toFixed(2)}`;
    res.status(201).json({ dateTime: datetime });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getDateTime: getDateTime,
};
