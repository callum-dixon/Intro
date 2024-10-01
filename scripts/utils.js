// colours
var color = hslToHex();
var up = true;
var value = 0;
var increment = 0.5;
var ceiling = 360;

function hslToHex() {
  var h = value;
  var s = 100;
  var l = 50;

  if (up == true && value <= ceiling) {
    value += increment;

    if (value == ceiling) {
      up = false;
    }
  } else {
    up = false;
    value -= increment;

    if (value < 0) {
      up = true;
    }
  }

  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `0x${f(0)}${f(8)}${f(4)}`;
}
