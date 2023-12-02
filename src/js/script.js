// 获取粒子容器
const container = document.getElementById("particle-container");

// 创建粒子的函数
function createParticle() {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  // 随机设置粒子的位置
  const randomX = Math.random() * window.innerWidth;
  const randomY = Math.random() * window.innerHeight;

  particle.style.left = `${randomX}px`;
  particle.style.top = `${randomY}px`;

  // 随机设置粒子的大小
  const size = Math.random() * 30 + 10; // 随机大小在10到40像素之间
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  // 随机设置粒子的颜色
  const randomColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
  particle.style.backgroundColor = randomColor;

  // 将粒子添加到容器
  container.appendChild(particle);

  // 随机设置粒子的动画
  const animationDuration = Math.random() * 2 + 1; // 随机动画持续时间在1到3秒之间
  particle.style.animation = `jump ${animationDuration}s infinite ease-in-out`;

  // 监听粒子动画结束，然后删除粒子
  particle.addEventListener("animationiteration", () => {
    container.removeChild(particle);
  });
}

// 创建粒子的定时器，可以自行调整产生粒子的频率
setInterval(createParticle, 2000);
