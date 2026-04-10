根据已有的项目设计体系，反推一份ghdi-design-md模板

###  核心设计资产 (Visual & Logic)

- **Figma/Adobe XD 链接或截图：** 
- https://mastergo.com/goto/S028Kikk?page_id=0:2903&file=188196286918363 

- **图标库 (Iconography)：** Solid面性图标
    
- **阴影与层级 (Elevation)：** Card + Dropdown 

### 技术实现规范 (Code implementation)

- **组件库文档 (Storybook/Documentation)：**
- https://element.eleme.cn/#/zh-CN/component/installation
    
- **核心配置代码： 暂无
- **技术栈：** Vue
### 典型页面原型 (Component Patterns)

- **高频页面截图：**

| 页面                 | 截图                                        | 文件名        |
| ------------------ | ----------------------------------------- | ---------- |
| dashboard资产管理首页    | ![[Pasted image 20260408103800.png\|210]] | 数据可视化1.vue |
| dashboard工单汇总-数据统计 | ![[Pasted image 20260408103332.png\|206]] | 数据可视化2.vue |
| 列表页-通知公告列表页        | ![[Pasted image 20260408151438.png\|203]] | 列表页.vue    |
| 详情页                | ![[Pasted image 20260409093411.png\|206]] | 详情页.vue    |
| 表单页                | ![[Pasted image 20260409093600.png\|219]] | 表单页.vue    |


    
- **交互规范：** 比如全局的 Loading 状态、空状态（Empty States）、错误提示（Toast/Alert）的统一样式。
    ![[Pasted image 20260409092731.png|230]]
![[Pasted image 20260409092801.png]]
###  项目特定的业务语境 (Domain Context)


- **数据可视化标准：** 是根据各个模块的主题色，生成色带用于数据可视化
```
-     computeColorBands() {

      // 根据主题色生成两条色带：

      // 1) 主色 -> 白色，等分为 5 段，取 6 个断点色

      // 2) 白色 -> 副色，等分为 4 段，取 5 个断点色

      const mainColorBand = this.generateGradient(this.accentMainColor, '#FFFFFF', 4)

      const subColorBand = this.generateGradient('#FFFFFF', this.accentSubColor, 2)

      this.dynamicColorBand = [...mainColorBand, ...subColorBand]

    },

    generateGradient(startHex, endHex, segments) {

      const start = this.hexToRgb(startHex)

      const end = this.hexToRgb(endHex)

      const steps = Math.max(1, segments)

      const colors = []

      for (let i = 0; i <= steps; i += 1) {

        const t = i / steps

        const r = Math.round(start.r + (end.r - start.r) * t)

        const g = Math.round(start.g + (end.g - start.g) * t)

        const b = Math.round(start.b + (end.b - start.b) * t)

        const hex = this.rgbToHex(r, g, b)

        if ((hex || '').toUpperCase() !== '#FFFFFF') {

          colors.push(hex)

        }

      }

      return colors

    },
```
    
- **国际化需求：** 不需要



