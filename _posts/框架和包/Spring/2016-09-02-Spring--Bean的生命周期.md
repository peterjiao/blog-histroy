---
layout: post
title:  "Spring--Bean生命周期"
date:   2016-09-02 21:18:30
categories: 框架和包 
tags: Spring 
---

* content
{:toc}

>Spring Bean生命周期。





## Bean的生命周期



### BeanFactory中Bean的生命周期



> ```
> instantiation  n.实例化；
> aware adj.意识到的，明白的，知道的。
> processor    n.处理器，
> post   n.工作，职位；  v.邮寄，寄出
> initialization    n.初始化；赋初值。
> ```

#### 流程

```java
开始
1.    通过 getBean()获取某一个Bean
  
2. ☆调用 InstantiationAwareBeanPostProcessor#postProcessBeforeInstantiation() 方法
3.   实例化，根据配置情况调用Bean的构造函数或工厂方法实例化Bean
4. ☆调用 InstantiationAwareBeanPostProcessor#postProcessAfterInstantiation() 方法
  
5. ☆调用 InstantiationAwareBeanPostProcessor#postProcessPropertyValues() 方法，在设置每个属性值之前先调用
6.   设置属性，调用Bean的属性设置方法设置属性值，如： setXxx方法
  
7.   调用 BeanNameAware#setBeanName() 方法
8.   调用 BeanFactoryAware#setBeanFactory() 方法
  
9. ☆调用 BeanPostProcessor#postProcessBeforeInitialization() 方法
10.  调用 InitializingBean#afterPropertiesSet() 方法
11.  通过 init-method 属性配置的初始化方法
12.☆调用BeanPostProcessor#postProcessAfterInitialization() 方法
  
13.  调用 DisposableBean#afterPropertiesSet() 方法
14.  通过 destroy-method 属性配置的销毁方法
结束
带☆的为容器级的生命周期接口方法，一般称为“后处理器”。
  
将上述流程分为三类：
  1.Bean自身方法，如Bean自身的构造函数、Setter方法设置属性以及<bean>的init-method和destroy-method所指定的初始化和销毁时的方法。
  2.Bean级别生命周期接口方法，需要bean自身实现接口的方法，如BeanNameAware、BeanFactoryAware、InitializingBean和DisposableBean
  3.容器级别生命周期接口，即 后处理器 。此类一般不由Bean本身实现，独立于Bean，实现这些接口的类以容器附加装置的形式注册到Spring容器中。特点是：当Spring容器创建任何Bean的时候，这些后处理器都会执行并发生作用，它们的影响是全局性的。 如： InstantiationAwareBeanPostProcessor和BeanPostProcessor 接口。 
  
  区别： 
   第一类别，目标Bean关注自身方法，不需要实现任何接口。
   第二类别，目标Bean需要实现相应的接口，有耦合。
   第三类别，修改和目标Bean没有关系，需要额外的类实现接口，并注册到Spring容器中。
  
  2~4,后处理器 `InstantiationAwareBeanPostProcesor`,

```





### ApplicationContext中Bean的生命周期



```java
开始
1. 启动容器
2. 调用 BeanFactoryPostProcessor#postProcessBeanFactory() 方法对工厂定义信息进行后处理
3. 通过 getBean() 调用某一个Bean
  
4. 调用 InstantiationAwareBeanPostProcessor#postProcessBeforeInstantiation() 方法
5. 实例化
6. 调用 InstantiationAwareBeanPostProcessor#postProcessAfterInstantiation() 方法

7. 调用 InstantiationAwareBeanPostProcessor#postProcessPropertyValues() 方法
8. 设置属性值

9. 调用 BeanNameAware#setBeanFactory() 方法
10.调用 BeanFactoryAware#setBeanFactory() 方法
11.☆调用 ApplicationContextAware#setApplicationContext() 方法

12.☆调用 BeanPostProcessor#postProcessBeforeInitialization() 方法
13.调用 InitizlizingBean#afterPropertiesSet() 方法
14.通过 init-method 属性配置的初始化方法
15.调用 BeanPostProcessor#postProcessAfterInitalization() 方法

16.调用 DisposableBean#afterPropertiesSet() 方法
17.通过 destroy-method 属性配置的销毁方法

结束
```









































