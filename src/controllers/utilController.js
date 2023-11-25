async function getDateTime(req, res) {
  try {
    const date = new Date();
    const s = date.getSeconds();
    const sDisplay = s > 0 ? (s < 10 ? "0" + s : s) : "00";
    const datetime = `${date.getHours()}:${date.getMinutes()}:${sDisplay}`;
    res.status(201).json({ dateTime: datetime });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getDateTime: getDateTime,
};
