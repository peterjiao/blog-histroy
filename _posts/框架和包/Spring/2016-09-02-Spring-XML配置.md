---
layout: post
title:  "Spring的XML配置"
date:   2016-09-02 22:00:09
categories: 框架和包 
tags: Spring 
---

* content
{:toc}

>Spring的XML配置。





## XML配置文件

### 属性注入：

```xml
<bean id="" class="">
  
  <property name="name"><value>中文</value></property>
  <property name="age"><value>12</value></property>

</bean>
```



需要有和属性名称对应的set方法。 

根据规范，满足”变量名称的前两个字母，要么全部大写，要么全部小写。“



### 构造函数注入： 

```xml
<bean id=“” class=“”>

  <constructor-arg type="java.lang.String" >
    <value>中文</value>
  </constructor-arg>

  <constructor-arg type="int">
     <value>20</value>
  </constructor-arg>

</bean>
```



需要有个数和类型相符的构造方法，顺序不重要。 

```xml
<bean id="" class="">

  <constructor-arg index="0" type="java.lang.String">
    <value>中文</value>
  </constructor-arg>

  <constructor-arg index="1" type="int">
     <value>20</value>
  </constructor-arg>

</bean>
```



通过index属性，标示顺序。 

`<ref bean="person"> `

通过ref标签，指向其他bean的id。 

### 工厂方法注入： 

   ####      非静态工厂方法： 

      必须向new一个工厂类，通过这个工厂类生成目标类。 

```java
public class PersonFactory{

        public Person createPerson(){

              return new Person("onePerson",20);

         }

     }
```



```xml
<bean id="pFactory" class="" />

<bean id="onePerson" factory-bean="pFactory" factory-method="createPerson" />  
```



factory-bean // factory-method 

####       静态工厂 ： 

```java
 public class PersonFactory{

      public static Person createPerson(){

       }

   }

```

  

```xml
<bean id="secPerson" class="com.peter.factory.PersonFactory" factory-method="getInstance" />
```



通过class指向对应的工厂类，让后factory-method属性指向获取目标对象的方法。 



### 注入参数

#### 字面值

可用字符串表示的值，这些值可以通过`<value>`标签进行注入。 

默认情况下，基本数据类型及其封装类型、String等都采用这种方式。 

​	`<value><![CDATA][ 、，“等等 ]></value>`

特殊字符，需要转义，如下表： 

也可以使用！【CDATA】[XXX]    这个标记，其中的字符会原样输出，包含空格。 



#### 引用其他Bean

使用`<ref>`元素标记来引用其他bean。 和`<value>`元素并列。 

```java
public void setPerson(Person p){
  ...
}
```

```xml

<property name="person">

	<ref bean="person" />

</property>

```



`<ref>`元素标记有三个属性。

bean：引用同意容器或父容器的

local：只能引用同一配置文件的

parent：引用父容器的



说明： 子容器和父容器可以声明相同id 的bean(同一容器不可以) ，所以此处出现了3种可选的引用范围。  



#### 内部Bean

```xml
<bean id="Boss" class="com.peter.person.Boss">

  <property name="person">
    <bean class="com.peter.person.Person">
      <property name="name" value="boss" />
      <property name="age" value="20" />
    </bean>
  </property>

</bean>
```





和java的匿名类很像，没有名字，不能被其他类引用或调用，只会被使用一次。 



#### null值

如下配置，会给目标设置一个”“的字符串。 

```xml
<property><value></value></property>
```



如果想给目标类设置空值null， 

```xml
<property><null/></property>
```



使用`null`标记。 



#### 级联属性

```xml
<bean id="boss" class="com.peter.person.boss">

  <property name="person.name" value="boss" />

</bean>
```

会调用Boss.getPerson().setName("boss")进行属性的装配操作。 

Boss对象持有Person对象， 在Boss对象的配置文件中设置了person对象的属性。 

对于层级没有限制。 



### 集合类型属性

java.util包中的集合类是最常用的数据结构类型，主要包括List、Set、Map、Properties。 

Spring为这些类提供了专门的配置元素标签。 

#### List、[]

```java
public class Person{

	private String name;

	private int age;

	private List<String> favorites;

}

```

```xml
<bean id="" class="" >

  <property name="favorites">
    <list>
      <value>stay</value>
      <value>play</value>
    </list>
  </property>

</bean>
```



`list`里的内容，可以是字面值用`value`，也可以是对象用`ref`来进行配置。 

其他如String[]、int[] 等数组类型也同样使用`list`元素标记进行配置。 



#### Set

```xml
<bean>

  <property>
    <set>
      <value></value>
    </set>
  </property>

</bean>

```



使用`set`元素标记，和list使用方法区别不大。 



#### Map

```xml
<bean>

  <property>
    <map>
      <entry>
        <key><value></value></key>
        <value></value>
      </entry>

      <entry>
        <key><value></value></key>
        <value></value>
      </entry>
    </map>
  </property>

</bean>
```

嵌套元素比较多， 顺序 `map`、`entry`、`key`、`value`，

map是key-value结构，每一个key-value为一个子项，成为`entry`。

其中`value`元素标签可以使用`ref`元素标签替换，当不是字面值的时候 。 



#### Properties

properties,可以看成是特殊的map，即，key和value均是字符串的map。 

```xml
<bean>

  <property>
    <props>
      <prop key=""></prop>
      <prop key=""></prop>
    </props>
  </property>

</bean>

```



比map简化，注意，没有用到`value`元素标签。 

`props`、`prop`



#### 集合合并



### 简化配置

#### 字面值属性

```xml
<property name="" value=""/>

<constructor-arg type="" index="" value="" />

<map>

  <entry key="" value="">

</map>
```

把`<value>`从一个元素标记变成了一个属性。



#### 引用对象属性

```xml
<property  name="" ref=""/>

<constructor-arg type="" index=""  ref=""    />

<map>

  <entry key-ref="" value-ref="">

</map>
```



`<ref>`元素标记变成属性。

其中`<ref>` 的简化形式对应`<ref bean="xxx">` 而 local和parent没有。 



#### 使用`p`命名空间

为了简化xml配置，使用属性替代子元素的方式。

需首先引入命名空间。？？

```xml
<bean id="" class="">

  <property name="name" value="boss" />
  <property name="person" ref="person" />

</bean>
```

```xml
<bean  id="" class=""  p:name="boss"  p:person-ref="person" />
```

将`<property>`元素标记变为属性。

形如`p:Xxx="Xxx"`,前面为属性名，后面为属性值。



### 自动装配（autowire）

为`<bean>` 元素标记提供了一个属性， `autowire="自动装配类型"`。

Spring提供了四种装配类型 ：

| 类型          | 说明                                       |
| ----------- | ---------------------------------------- |
| byName      | 根据名称进行自动匹配，假设Boss有一个名为person的属性，如果容器中有一个id为person 的bean，Spring会自动将其装配。 |
| byType      | 根据类型进行自动装配，假设Boss有一个Person类型的属性， 如果容器中有一个Person类型的Bean，则自动装配。 |
| constructor | 与ByType类似，针对构造函数而言，如果Boss中有一个构造函数，有一个Perosn类型的入参，。。。。 |
| autodetect  | 根据Bean的自省机制决定采用byType还是constructor，如果Bean提供了默认的构造函数，则采用ByType，否则采用constructor。 |

`<beans>`元素标签中的`default-autowire`属性可以配置全局自动装配。 默认值是`no`表示不启用。



## `bean`之间的关系

### 继承

如果多各类有相同的方法和属性，则我们可以引入一个父类，在父类中定义这些共同的方法和属性，以消除重复代码。

```xml
<bean id="abstractPerson"  class="com.peter.person" 
      p:name="aperson" 
      p:age="20"  
      abstract="true" />

<!-- ---------------------------------------------------- -->

<bean id="yongMan" 
      p:age="18" 
      parent="abstractPerson" />

<bean id="oldMan" 
      p:age="70" 
      parent="abstractPerson" />

```



父bean的`abstract`属性，设置为`true`则Spring不会创建该bean的实例，为`false`则这个bean也可以用来装配或者get bean。 



### 依赖

一方面，通过元素标签`<ref>`可以给一个bean指向另一个bean，表示依赖关系。 

另一方面，可以通过`<bean>`元素标记的属性`depends-on`来指定要在实例化此bean之前，前置要实例化的bean。这种方法，两个bean之间可以没有任何调用关系。 当有多个Bean时，可以通过`,`,,`;` 逗号，空格或分号，创建多个依赖。 



### 引用

此处的引用，是指 一个bean中要注入另一个bean的id属性的值，而不是要注入该bean对象的实例 。

```xml
<bean  id="employee" class="com.peter.person.Employee"/>

<bean  id="boss" class="com.peter.person.Boss" 
      p:employeeId="employee" />

```



此处，只想给Boss对象注入employeeBean的id属性的值。但是知道运行时期才会发现正确与否。

改进：

```xml
<bean  id="employee" class="com.peter.person.Employee"/>

<bean id="boss" class="com.peter.person.Boss">

  <property name="employeeId">
    <idref bean="employee" />
  </property>

</bean>
```



这种方式呢，spring在启动时就会针对`idref元素标记进行检测，能够及时的反馈该标记元素内容是否正确。 



此处 `bean="employee"` 范围如果是同一个xml配置文件中，可以使用`local="employee"`,这种方式IDE可以进行错误检查。 



## 整合多个配置文件

1.在配置spring配置文件位置的时候，可以指定多个文件。

2.使用元素标记`<import>`，可以引入别的配置文件。

```xml
<import   resource="classpath:resource/daoContext.xml"/>
<import   resource="classpath:resource/coreContext.xml"/>
```

一个XML配置文件可以通过`<import>`组合多个外部配置文件，`resource`属性支持Spring标准的资源路径。 



## Bean作用域

| 类别            | 说明                                       |
| ------------- | ---------------------------------------- |
| singleton     | 整个生命中，仅存在一个实例，单例模式                       |
| prototype     | 每次从容器中调用Bean时，都返回一个新的实例，相当于执行 `new XxxBean()`。 |
| request       | 每次Http请求都会创建一个新的Bean。                    |
| session       | 同一个HTTPSession共享一个Bean。                  |
| globalSession | 同一个全局Session共享一个Bean。                    |



通过`<bean>`属性`scope="<作用域>"`，进行设置。 



### singleton

​	一般情况下，无状态或者状态不可变的类适合使用单例模式。

​	Spring默认就是singleton模式，且默认会在启动时实例化所有singleton的Bean并缓存于容器中。 可以通过`lazy-init="true"`属性进行控制。

```xml
<bean  id="" class="" 
      p:person-ref="" 
      scoper="singleton"  
      lazy-init="true"/>
```



### prototype

​	每次都返回一个新的bean实例。



### Web应用环境相关的Bean作用域

​	如果使用WebApplicationContext 环境，scope还有另外3个选项：request、session、globalSession。

​	在Web容器中进行额外的配置



### 作用域依赖







## FactoryBean





## 基于注解的配置



> 不管是XML还是注解，它们都是表达Bean定义的载体，其实质都是为Spring容器提供Bean定义的信息，表现形式上是将XML定义的东西通过注解描述。 





```
spring 2.5 中除了提供 @Component 注释外，还定义了几个拥有特殊语义的注释，它们分别是：@Repository、@Service 和 @Controller。
在目前的 Spring 版本中，这 3 个注释和 @Component 是等效的，但是从注释类的命名上，很容易看出这 3 个注释分别和持久层、业务层和控制层（Web 层）相对应。
虽然目前这3 个注释和 @Component 相比没有什么新意，但 Spring 将在以后的版本中为它们添加特殊的功能。
所以，如果 Web 应用程序采用了经典的三层分层结构的话，最好在持久层、业务层和控制层分别采用上述注解对分层中的类进行注释。

@Service用于标注业务层组件

@Controller用于标注控制层组件（如struts中的action）

@Repository用于标注数据访问组件，即DAO组件

@Component泛指组件，当组件不好归类的时候，我们可以使用这个注解进行标注。


1.component-scan标签默认情况下自动扫描指定路径下的包（含所有子包），将带有@Component、@Repository、@Service、@Controller标签的类自动注册到spring容器。对标记了 Spring's @Required、@Autowired、JSR250's @PostConstruct、@PreDestroy、@Resource、JAX-WS's @WebServiceRef、EJB3's @EJB、JPA's @PersistenceContext、@PersistenceUnit等注解的类进行对应的操作使注解生效（包含了annotation-config标签的作用）。

getBean的默认名称是类名（头字母小写），如果想自定义，可以@Service(“aaaaa”)这样来指定。
这种bean默认是“singleton”的，如果想改变，可以使用@Scope(“prototype”)来改变。

```



### 使用注解配置信息的前置

```xml
<beans xmlns="" 
       xmlns:xsi="" 		xmlns:context="http://www.springframework.org/schema/context"  
       xsi:chemaLocation="http://www.springframework.org/schema/context                    http://www.springframework.org/schema/context/spring-context-3.0.xsd">

	
	<context:component-scan base-package="com.peter.person"/>

</beans>
```



xml的声明处，声明context命名空间。

然后，使用context命名空间的`component-scan`元素标签,制定扫描该包下的所有类，并从类的注解中获取Bean的定义信息。 



### Bean的注解

作用：取代在Xml配置文件中，使用的`<Bean>`元素标记。在类的上一行进行注解可达到同样的效果。

```java

@Component
public class Boss{
  ...
}

```

等价于：

```xml
<bean id="boss" class="com.peter.person.Boss" />
```



#### @Component

> 一个泛华概念，指一个Bean(组件)，可用作任何层次。



#### @Repository

> 标注DAO类，



不止描述这个类是一个Bean，同时还能降所标注的类中抛出的数据访问异常封装为Spring的数据访问异常类型。 



#### @Service

> 通常用在业务层，目前和`@Component`相同



#### @Constroller

> 通常用在控制层，目前和`@Component`相同







### 自动装配Bean

#### @Autowired

使用`@Autowired`进行自动注入

```java
@Service
public class LoginService{
	@Autowired
	private UserDao userDao;

  	@Autowired
  	private LogDao logDao;
}
```

 

使用`@service`标记LoginService为一个Bean，通过`@Autowired`自动注入属性，默认按类型匹配的方式，在容器查找匹配的Bean，当有仅有一个匹配的Bean时，Spring将其注入到@Autowired标注的变量中。 



#### @Autowired属性required

作用：当Spring找不到和标注变量类型相同的Bean时，抛出异常`NoSuchBeanDefinitionException`，如果希望Spring即使找不到匹配的Bean也不要抛出异常可以使用 `@Autowired(required=false)`进行标注。 



#### @Qualifier 标注

作用：指定要注入的bean的名称(bean的id)。 

当有多个同类型的bean时，不能使用`@Autowired`进行标注。

```java
public class LoginDao{
  @Autowired
  private LogDao logDao;
  
  @Autowired
  @Qualifier("userDao")
  private UserDao userDao;
}
```

假设容器中有连个类型为`UserDao`的Bean，一个名为`userDao`,另一个名为`otherUserDao`，此处会注入匹配的。 



#### 对类方法进行标注

```java
public class LoginService{
  private LogDao logDao;
  private UserDao userDao;
  
  @Autowired
  public void setLogDao(LogDao logDao){
    this.logDao=logDao;
  }
  
  @Autowired
  @Qualifier("userDao")
  public void setUserDao(UserDao userDao){
    this.userDao = userDao;
  }
  
  @Autowired
  public void init(@Qualifier("userDao")UserDao userDao,LogDao logDao){
    ...
  }
}
```

将注解标在方法上，同样适用。

且注解在入参上也同样适用。 

​	一般情况下，在Spring容器中大部分的Bean都是单例的，所以一般无需通过`@Repository`,`@Service`的属性`value`为Bean指定名称，也无需`@Qualifier`指定按名称进行注入。



### 对集合类型进行标注

？

@Resource和@Inject

@Resource要求提供一个Bean名称的属性，如果属性为空，则自动采用标注处的变量名或方法名作为目标。 

即：@Autowired默认按类型匹配注入Bean，@Resource则按名称匹配注入Bean。

@Inject和@Autowired一样也是按照类型匹配注入Bean，但是没有required属性。



### Bean作用范围及生命过程方法

作用范围：

`@Scopre("prototype")`

​	通过注解配置的Bean和通过<bean>标记配置的Bean一样，默认的作用范围都是singleton。

​	注解可以通过@Scope，指定作用范围。

```java
@Scopre("prototype")
@Component
public class Person{
  ...
}
```



生命周期方法： 

​	在配置文件中，可以通过`init-method`,`destroy-method`指定Bean的初始化及容器销毁前执行的方法。 

​	注解中，可以使用`@PostConstruct`,`PreDestroy`注解，相当于前面的功能，且在同一个Bean中，可定义多个。

```java
@Component
public class Boss{
  private Person person;
  public Boss(){
    syso();
  }
  
  @Autowired
  public setPerson(Person person){...}
  
  @PostConstruct
  private void init1{
    syso("init 1")
  }
  
  @PostConstruct
  private void init2{
    syso("init 2")
  }
  
  @PreDestroy
  private void destroy1{
    syso("destroy 1")
  }
  
  @PreDestroy
  private void destroy2{
    syso("destroy 2")
  }
}
```



## 基于Java类的配置

> Spring3.0新添加。

















