[TOC]

# VLOOK THEME for VIP
## 更美观的公式

###### 段落内混排的公式

这是行内混排的「**数学公式**」$\lim_{x \to \infty} \exp{-x} = 0$，也可以是「**化学公式**」$\ce{CH4 + 2 $\left( \ce{O2 + 79/21 N2} \right)$}$

> [+] **看看以上公式的代码**
>
> > 数学公式的代码：`$\lim_{x \to \infty} \exp{-x} = 0$`
> >
> > 化学公式的代码：`$\ce{CH4 + 2 $\left( \ce{O2 + 79/21 N2} \right)$}$`

###### 独占一行的公式块

$$
\begin{align*}
y = y(x,t) &= A e^{i\theta} \\
&= A (\cos \theta + i \sin \theta) \label{mymath-1}\tag{My Math - 1} \\
&= A (\cos(kx - \omega t) + i \sin(kx - \omega t)) \\
&= A\cos(kx - \omega t) + i A\sin(kx - \omega t)  \\
&= A\cos \Big(\frac{2\pi}{\lambda}x - \frac{2\pi v}{\lambda} t \Big) + i A\sin \Big(\frac{2\pi}{\lambda}x - \frac{2\pi v}{\lambda} t \Big) \label{mymath-2}\tag{My Math - 2} \\
&= A\cos \frac{2\pi}{\lambda} (x - v t) + i A\sin \frac{2\pi}{\lambda} (x - v t) \label{mymath-3}\tag{My Math - 3}
\end{align*}
$$

还可以引用公式序号，例如参考公式：$\ref{mymath-1}$

###### 表格内的公式

|               标题               | 公式                                                         | 说明                                                         |
| :------------------------------: | :----------------------------------------------------------- | ------------------------------------------------------------ |
| 勾股定理<br />（毕达哥拉斯定理） | $a^2+b^2=c^2$                                                | 在平面上的一个直角三角形中，两个直角边边长的平方加起来等于斜边长的平方。<br />如果设直角三角形的两条直角边长度分别是 $a$ 和 $b$，斜边长度是 $c$ |
|             质能方程             | $E=mc^2$                                                     | 其中，<br />$E$ 是能量，单位是[焦耳](https://baike.baidu.com/item/焦耳/5489626)（$J$）<br />$m$ 是质量，单位是[千克](https://baike.baidu.com/item/千克)（$Kg$）<br />$c$ 是真空中[光速](https://baike.baidu.com/item/光速)（$m/s$），$c=299792458 m/s$ |
|          麦克斯韦方程组          | $\nabla \cdot \mathbf{E} = \cfrac{\rho}{\varepsilon_0}$<br />$\nabla \cdot \mathbf{B} = 0$<br />$\nabla \times \mathbf{E} = -\cfrac{\partial \mathbf{B}}{\partial t}$<br />$\nabla \cdot \mathbf{B} = \mu _0 \mathbf{J} + \mu _0 \varepsilon_0 \cfrac{\partial \mathbf{E}}{\partial t}$ | [麦克斯韦方程组](https://baike.baidu.com/item/%E9%BA%A6%E5%85%8B%E6%96%AF%E9%9F%A6%E6%96%B9%E7%A8%8B%E7%BB%84)（英语：Maxwell's equations） |
