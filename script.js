const ul = document.getElementById("generator");
const parent = document.querySelectorAll(".parent");
const title = document.querySelectorAll("li>h4");
const box = document.getElementById("box");
let print = document.getElementById("print");
const lay = document.querySelector(".bdf");

parent.forEach((item) => {
  item.setAttribute("data-h", item.clientHeight);
  item.style.height = "0";
});

title.forEach((item) => {
  item.addEventListener("click", (e) => {
    let next = e.target.nextElementSibling;
    if (item.getAttribute("data-status") == "off") {
      next.style.height = parseInt(next.getAttribute("data-h")) + 10 + "px";
      item.setAttribute("data-status", "on");

      item.children[1].style.transform = "rotate(180deg)";
    } else {
      next.style.height = "0px";
      item.setAttribute("data-status", "off");
      item.children[1].style.transform = "rotate(0deg)";
    }
  });
});

const range = document.querySelectorAll("input[type=range]");
range.forEach((item) => {
  item.addEventListener("input", (e) => {
    e.target.nextElementSibling.innerText = e.target.value;
  });
});

// rgba
const selectRgba = document.getElementById("rgba");
const colorInput = document.getElementById("color");
const r = document.getElementById("r");
const g = document.getElementById("g");
const b = document.getElementById("b");
const a = document.getElementById("a");
r.value = 255;
g.value = 255;
b.value = 255;
a.value = 1;
const rgbaGenerator = () => {
  selectRgba.addEventListener("change", () => {
    updateColor();
  });
  colorInput.addEventListener("change", () => {
    const color = colorInput.value;
    const rgba = hexToRgba(color);
    r.value = rgba.r;
    g.value = rgba.g;
    b.value = rgba.b;
    a.value = rgba.a;

    updateColor();
  });
  r.addEventListener("input", () => {
    if (r.value > 255) {
      r.value = 255;
    }
    updateColor();
    updateColorInput();
  });
  g.addEventListener("input", () => {
    if (g.value > 255) {
      g.value = 255;
    }
    updateColor();
    updateColorInput();
  });
  b.addEventListener("input", () => {
    if (b.value > 255) {
      b.value = 255;
    }
    updateColor();
    updateColorInput();
  });
  a.addEventListener("input", () => {
    if (a.value > 1) {
      a.value = 1;
    }
    updateColor();
    updateColorInput();
  });
};
function updateColor() {
  if (selectRgba.value == "background") {
    box.style.backgroundColor = `rgba(${r.value},${g.value},${b.value},${a.value})`;
    print.children[0].innerText = `background-color : rgba(${r.value},${g.value},${b.value},${a.value})`;
  } else {
    box.style.color = `rgba(${r.value},${g.value},${b.value},${a.value})`;
    print.children[1].innerText += `color : rgba(${r.value},${g.value},${b.value},${a.value})`;
  }
}
function updateColorInput() {
  const rgba = `rgba(${r.value},${g.value},${b.value},${a.value})`;
  const hex = rgbaToHex(rgba);
  colorInput.value = hex;
}
function hexToRgba(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 1,
      }
    : null;
}
function rgbaToHex(rgba) {
  const result = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d{1,3})\)$/i.exec(rgba);
  return result
    ? `#${(
        (1 << 24) +
        (parseInt(result[1]) << 16) +
        (parseInt(result[2]) << 8) +
        parseInt(result[3])
      )
        .toString(16)
        .slice(1)}`
    : null;
}
rgbaGenerator();
// updateColor();
///

/// transform
const inputs = document.querySelectorAll(".transform>.parent>div>div>input");
const transformGenerator = () => {
  inputs.forEach((item) => {
    item.addEventListener("input", (e) => {
      let value = e.target.value;
      let transform = box.style.transform || "";

      switch (item.id) {
        case "rotate":
          transform =
            transform.replace(/rotate\([^)]+\)/g, "") + ` rotate(${value}deg)`;
          break;
        case "scaleX":
          transform =
            transform.replace(/scaleX\([^)]+\)/g, "") + ` scaleX(${value})`;
          break;
        case "scaleY":
          transform =
            transform.replace(/scaleY\([^)]+\)/g, "") + ` scaleY(${value})`;
          break;
        case "skewX":
          transform =
            transform.replace(/skewX\([^)]+\)/g, "") + ` skewX(${value}deg)`;
          break;
        case "skewY":
          transform =
            transform.replace(/skewY\([^)]+\)/g, "") + ` skewY(${value}deg)`;
          break;
        case "translateX":
          transform =
            transform.replace(/translateX\([^)]+\)/g, "") +
            ` translateX(${value}px)`;
          break;
        case "translateY":
          transform =
            transform.replace(/translateY\([^)]+\)/g, "") +
            ` translateY(${value}px)`;
          break;
      }

      box.style.transform = transform;
      print.children[2].innerText = `transform : ${transform}`;
    });
  });
};
transformGenerator();
///

///border
const borderStyle = document.getElementById("borderStyle");
const borderWidth = document.getElementById("borderWidth");
const borderRadius = document.getElementById("borderRadius");
const borderColor = document.getElementById("borderColor");
const borderR = document.getElementById("border-R");
const borderG = document.getElementById("border-G");
const borderB = document.getElementById("border-B");
const borderA = document.getElementById("border-A");
const borderGenerator = () => {
  borderStyle.addEventListener("change", () => {
    updateBorder();
  });
  borderWidth.addEventListener("input", () => {
    updateBorder();
  });
  borderRadius.addEventListener("input", () => {
    updateRadius();
  });
  borderColor.addEventListener("change", () => {
    const color = borderColor.value;
    const rgba = hexToRgba(color);
    borderR.value = rgba.r;
    borderG.value = rgba.g;
    borderB.value = rgba.b;
    borderA.value = rgba.a;

    updateBorder();
  });

  borderR.addEventListener("input", () => {
    if (borderR.value > 255) {
      borderR.value = 255;
    }
    updateBorder();
    updateBorderColor();
  });

  borderG.addEventListener("input", () => {
    if (borderG.value > 255) {
      borderG.value = 255;
    }
    updateBorder();
    updateBorderColor();
  });

  borderB.addEventListener("input", () => {
    if (borderB.value > 255) {
      borderB.value = 255;
    }
    updateBorder();
    updateBorderColor();
  });

  borderA.addEventListener("input", () => {
    if (borderA.value > 1) {
      borderA.value = 1;
    }
    updateBorder();
    updateBorderColor();
  });

  function updateBorder() {
    box.style.border = `${borderWidth.value}px ${borderStyle.value} rgba(${borderR.value},${borderG.value},${borderB.value},${borderA.value})`;
    print.children[3].innerText = `border : ${borderWidth.value}px ${borderStyle.value} rgba(${borderR.value},${borderG.value},${borderB.value},${borderA.value})`;
  }
  function updateRadius() {
    box.style.borderRadius = `${borderRadius.value}px`;
    print.children[4].innerText = `border-radius ${borderRadius.value}px`;
  }

  function updateBorderColor() {
    const rgba = `rgba(${borderR.value},${borderG.value},${borderB.value},${borderA.value})`;
    const hex = rgbaToHex(rgba);
    borderColor.value = hex;
  }

  function hexToRgba(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
          a: 1,
        }
      : null;
  }

  function rgbaToHex(rgba) {
    const result = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d{1,3})\)$/i.exec(rgba);
    return result
      ? `#${(
          (1 << 24) +
          (parseInt(result[1]) << 16) +
          (parseInt(result[2]) << 8) +
          parseInt(result[3])
        )
          .toString(16)
          .slice(1)}`
      : null;
  }
};
const updateBorder = () => {
  box.style.border = `${borderWidth.value}px ${borderStyle.value} ${borderColor.value}`;
  box.style.borderRadius = `${borderRadius.value}px`;
};
borderGenerator();
///

/// gradient
const gradientGenerator = () => {
  document.getElementById("generate").addEventListener("click", function () {
    const gradientType = document.getElementById("gradientType").value;
    const color1 = document.getElementById("color1").value;
    const color2 = document.getElementById("color2").value;
    const angle = document.getElementById("angle");
    if (angle.value > 360) {
      angle.value = 360;
    }

    let gradient;

    switch (gradientType) {
      case "linear":
        gradient = `linear-gradient(${angle.value}deg, ${color1}, ${color2})`;
        print.children[5].innerText = `background : linear-gradient(${angle.value}deg, ${color1}, ${color2})`;
        break;
      case "radial":
        gradient = `radial-gradient(circle, ${color1}, ${color2})`;
        print.children[5].innerText = `background : radial-gradient(circle, ${color1}, ${color2})`;

        break;
      case "conic":
        gradient = `conic-gradient(from ${angle.value}deg, ${color1}, ${color2})`;
        print.children[5].innerText = `background : conic-gradient(from ${angle.value}deg, ${color1}, ${color2})`;
        break;
      default:
        gradient = `linear-gradient(${angle.value}deg, ${color1}, ${color2})`;
    }

    box.style.background = gradient;
  });
};
gradientGenerator();
///

/// box shadow
const shadowX = document.getElementById("xbs");
const shadowY = document.getElementById("ybs");
const shadowBlur = document.getElementById("blur");
const shadowSpread = document.getElementById("spread");
const boxColor = document.getElementById("box-color");
const boxColorR = document.getElementById("box-r");
const boxColorG = document.getElementById("box-g");
const boxColorB = document.getElementById("box-b");
const boxColorA = document.getElementById("box-a");
boxColorR.value = 0;
boxColorG.value = 0;
boxColorB.value = 0;
boxColorA.value = 1;

const boxShadowGenerator = () => {
  shadowX.addEventListener("input", updateBoxShadow);
  shadowY.addEventListener("input", updateBoxShadow);
  shadowBlur.addEventListener("input", updateBoxShadow);
  shadowSpread.addEventListener("input", updateBoxShadow);
  boxColor.addEventListener("input", updateBoxShadow);
  boxColorR.addEventListener("input", updateBoxShadow);
  boxColorG.addEventListener("input", updateBoxShadow);
  boxColorB.addEventListener("input", updateBoxShadow);
  boxColorA.addEventListener("input", updateBoxShadow);

  function updateBoxShadow() {
    const rgba = `rgba(${boxColorR.value}, ${boxColorG.value}, ${boxColorB.value}, ${boxColorA.value})`;
    box.style.boxShadow = `${shadowX.value}px ${shadowY.value}px ${shadowBlur.value}px ${shadowSpread.value}px ${rgba}`;
    print.children[6].innerText = `box-shadow : ${shadowX.value}px ${shadowY.value}px ${shadowBlur.value}px ${shadowSpread.value}px ${rgba}`;
  }

  boxColor.addEventListener("change", () => {
    const color = boxColor.value;
    const rgba = hexToRgba(color);
    boxColorR.value = rgba.r;
    boxColorG.value = rgba.g;
    boxColorB.value = rgba.b;
    boxColorA.value = rgba.a;
    updateBoxShadow();
  });

  function hexToRgba(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
          a: 1,
        }
      : null;
  }
};
boxShadowGenerator();
///

/// text shadow
const textShadowX = document.getElementById("text-shadow-x");
const textShadowY = document.getElementById("text-shadow-y");
const textShadowBlur = document.getElementById("text-shadow-blur");
const textColor = document.getElementById("text-color");
const textColorR = document.getElementById("text-r");
const textColorG = document.getElementById("text-g");
const textColorB = document.getElementById("text-b");
const textColorA = document.getElementById("text-a");
textColorR.value = 0;
textColorG.value = 0;
textColorB.value = 0;
textColorA.value = 1;
const textShadowGenerator = () => {
  const updateTextShadow = () => {
    const rgba = `rgba(${textColorR.value}, ${textColorG.value}, ${textColorB.value}, ${textColorA.value})`;
    box.style.textShadow = `${textShadowX.value}px ${textShadowY.value}px ${textShadowBlur.value}px ${rgba}`;
    print.children[7].innerText = `text-shadow : ${textShadowX.value}px ${textShadowY.value}px ${textShadowBlur.value}px ${rgba}`;
  };

  const setupListeners = () => {
    textShadowX.addEventListener("input", () => {
      document.querySelector(`#text-shadow-x + span`).textContent =
        textShadowX.value;
      updateTextShadow();
    });
    textShadowY.addEventListener("input", () => {
      document.querySelector(`#text-shadow-y + span`).textContent =
        textShadowY.value;
      updateTextShadow();
    });
    textShadowBlur.addEventListener("input", () => {
      document.querySelector(`#text-shadow-blur + span`).textContent =
        textShadowBlur.value;
      updateTextShadow();
    });

    textColor.addEventListener("input", () => {
      const color = textColor.value;
      const rgba = hexToRgba(color);
      textColorR.value = rgba.r;
      textColorG.value = rgba.g;
      textColorB.value = rgba.b;
      textColorA.value = rgba.a;
      updateTextShadow();
    });

    textColorR.addEventListener("input", updateTextShadow);
    textColorG.addEventListener("input", updateTextShadow);
    textColorB.addEventListener("input", updateTextShadow);
    textColorA.addEventListener("input", updateTextShadow);
  };

  setupListeners();

  function hexToRgba(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
          a: 1,
        }
      : null;
  }
};
textShadowGenerator();
///

/// text rotation
const text = document.querySelector("#box>span");
const rotate = document.getElementById("xtr");
const textRotateGenerator = () => {
  rotate.addEventListener("input", () => {
    text.style.transform = `rotate(${rotate.value}deg)`;
    print.children[8].innerText = `rotate : (${rotate.value}deg)`;
  });
};
textRotateGenerator();
///

/// backdrop filter
const filter = document.getElementById("filterD");
const percentage = document.getElementById("percentage");
const filterGenerator = () => {
  percentage.addEventListener("input", () => {
    updateFilter();
  });
  filter.addEventListener("change", () => {
    updateFilter();
  });
};
function updateFilter() {
  let val = percentage.value;
  let bgFilter = filter.value;
  let keeper = null;
  switch (bgFilter) {
    case "blur":
      keeper = `blur(${val}px)`;
      print.children[9].innerText = `backdrop-filter : blur(${val}px)`;
      break;
    case "brightness":
      keeper = `brightness(${val})`;
      print.children[9].innerText = `backdrop-filter : brightness(${val})`;
      break;
    case "contrast":
      keeper = `contrast(${val})`;
      print.children[9].innerText = `backdrop-filter : contrast(${val})`;
      break;
    case "grayScale":
      keeper = `grayScale(${val})`;
      print.children[9].innerText = `backdrop-filter : grayScale(${val})`;
      break;
    case "hue":
      keeper = `hue-rotate(${val}deg)`;
      print.children[9].innerText = `backdrop-filter : hue-rotate(${val}deg)`;
      break;
    case "invert":
      keeper = `invert(${val})`;
      print.children[9].innerText = `backdrop-filter : invert(${val})`;
      break;
    case "saturate":
      keeper = `saturate(${val})`;
      print.children[9].innerText = `backdrop-filter : saturate(${val})`;

      break;
    case "sepia":
      keeper = `sepia(${val})`;
      print.children[9].innerText = `backdrop-filter : sepia(${val})`;

      break;
  }
  lay.style.backdropFilter = keeper;
}
filterGenerator();
///
