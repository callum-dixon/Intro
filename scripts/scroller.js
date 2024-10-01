// constants
var STARFIELD_DENSITY = 320;
var STARFIELD_DOT_SIZE = 1;
var STARFIELD_SPEED = -0.74;

// text
var myfont = new image("media/font2.png");
var rasters = new image("media/MegaBallsBack.png");
var myfxparam_scroll = [
  { value: 5, amp: 120, inc: 0.0019, offset: +0.028 },
  { value: 2, amp: 120, inc: 0.0019, offset: +0.058 },
];

var myscrolltext;
var myscrollparam = [{ myvalue: 15, amp: 1000, inc: 0.1, offset: -0.04 }];

// canvases
var screen;
var canvas_main;
var canvas_scroller;
var canvas_text;
var canvas_rasters;
var canvas_stars;

// var timers
var showCube = false;
var showStars = false;
var showFx = false;
var starFill = false;
var showText = false;

// starfield
var starfield_2d;
var starfield_2d_params = [
  {
    nb: STARFIELD_DENSITY,
    size: STARFIELD_DOT_SIZE,
    color: "#cecece",
    speedy: 0,
    speedx: STARFIELD_SPEED,
  },
  {
    nb: STARFIELD_DENSITY,
    size: STARFIELD_DOT_SIZE,
    color: "#737573",
    speedy: 0,
    speedx: STARFIELD_SPEED / 2,
  },
  {
    nb: STARFIELD_DENSITY,
    size: STARFIELD_DOT_SIZE,
    color: "#525552",
    speedy: 0.0,
    speedx: 0.0,
  },
];

// 3d
var my3d;

var joined = 1;

var color = 0x00ff00;

var myobj = new Array();
var myobjvert = new Array();
myobjvert = [
  { x: -1, y: 0, z: -1 },
  { x: 1, y: 0, z: -1 },
  { x: 1, y: 0, z: 1 },
  { x: -1, y: 0, z: 1 },
  { x: 0, y: -2, z: 0 },
  { x: 0, y: 2, z: 0 },
  { x: 0, y: -4, z: 0 },
];
myobj = [
  { p1: 0, p2: 1 },
  { p1: 1, p2: 2 },
  { p1: 2, p2: 3 },
  { p1: 3, p2: 0 },
  { p1: 0, p2: 4 },
  { p1: 1, p2: 4 },
  { p1: 2, p2: 4 },
  { p1: 3, p2: 4 },
  { p1: 0, p2: 5 },
  { p1: 1, p2: 5 },
  { p1: 2, p2: 5 },
  { p1: 3, p2: 5 },
];

var spinSpeedx = 0;
var spinSpeedy = 400;

function load() {
  // init screen canvas
  screen = new canvas(window.innerWidth, window.innerHeight, "main");
  screen.contex.imageSmoothingEnabled = false;
  screen.contex.mozImageSmoothingEnabled = false;
  screen.contex.oImageSmoothingEnabled = false;
  screen.contex.webkitImageSmoothingEnabled = true;
  screen.fill("#000000");

  // init canvases
  canvas_main = new canvas(window.innerWidth / 2, window.innerHeight / 2);
  canvas_rasters = new canvas(window.innerWidth, window.innerHeight);
  canvas_scroller = new canvas(window.innerWidth, window.innerHeight);
  canvas_text = new canvas(window.innerWidth, window.innerHeight00);
  canvas_stars = new canvas(window.innerWidth, window.innerHeight);
  scrollfx = new FX(canvas_main, canvas_stars, myfxparam_scroll);

  // init starfield
  starfield_2d = new starfield2D_dot(canvas_stars, starfield_2d_params);

  // init text
  myfont.initTile(32, 32, 32);
  myscrolltext = new scrolltext_horizontal();
  myscrolltext.scrtxt = "!    ";
  myscrolltext.init(canvas_scroller, myfont, 18, myscrollparam);

  // init 3D
  my3d = new codef3D(canvas_main, 20, 50, 1, 50);
  my3d.lines(
    myobjvert,
    myobj,
    new LineBasicMaterial({ color: 0x00ff00, linewidth: 2 })
  );

  // init music
  player = new music("MK");
  player.stereo(true);
  player.LoadAndRun("media/daxx.xm");

  timer();
  renderFrame();
}

function renderFrame() {
  // clear canvases
  canvas_main.fill("#000000");

  if (!starFill) {
    canvas_stars.draw(canvas_main, 0, 0);
    canvas_stars.clear();
  } else {
    canvas_stars.draw(canvas_main, 0, 0);
  }

  if (showFx) {
    canvas_text.setmidhandle();
    scrollfx.zoomx(1, 0, -1);
  }

  // draw starfield
  starfield_2d.draw(canvas_scroller);

  // draw text
  if (showText) {
    myscrolltext.draw(0);
    canvas_scroller.draw(canvas_main);
  }

  // draw 3D
  my3d.group.rotation.x += spinSpeedx;
  my3d.group.rotation.y += spinSpeedy;
  my3d.group.rotation.z += 0.0;

  if (showCube) {
    my3d.draw();
    if (spinSpeedx > 0) {
      my3d.lines(
        myobjvert,
        myobj,
        new LineBasicMaterial({ color: color, linewidth: joined })
      );
    }
  }

  canvas_main.draw(screen, 0, 0, 1, 0, 2, 2);

  color = hslToHex();

  // copy main canvas (double sized) to screen canvas
  requestAnimFrame(renderFrame);
}

function timer() {
  var sec = 32;
  var timer = setInterval(function () {
    sec--;
    if (sec == 24) {
      showFx = true;
    } else if (sec == 16) {
      showCube = true;
    } else if (sec == 8) {
      starFill = true;
    } else if (sec == 2) {
      clearInterval(timer);
      spinSpeedx = 0.0000001;
      showText = true;
    }
  }, 1000);
}
