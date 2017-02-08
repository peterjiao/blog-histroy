---
layout: post
title:  "集合"
date:   2016-08-11 22:16:05
categories: 集合 
tags: 集合 
---

* content
{:toc}

>Java集合框架的使用。





# 数据+查找+排序



随机访问、索引？？



> 不同的数据结构，是为了选择合适的存储数据集的方式，有的情况下需要排序快，有的情况下需要查找快，有的情况下只需要头和尾的数据。 



## 数据

### 基本数据类型

int

double

char

### 引用数据类型





## 数据结构

> 存储一系列数据(基本数据、引用数据)的结构。

### 集合

#### 集合

List,Set,Map,数组Array

Collection：List列表、Set集

Map：HashMap、Hashtable、TreeMap

集合是 单列集合

Collection 

```java

boolean add(E e) //向集合中添加元素， 添加成功返回true，添加失败(集合中已经有此元素如set)返回false。

boolean addAll(Collection<? extends E> c)  //将一个集合中所有元素添加到此集合
  
void clear()  // 清空所有元素
  
boolean contains(Object o) // 	集合中是否包含目标元素

boolean containsAll(Collection<?> c)  // 集合是否包含指定集合中的所有元素

boolean equals(Object o) //判断两个集合是否相等，可覆写。 默认情况下：1.有序集合，必须 元素个数相等，元素顺序相同，相同位置的元素对应相等，返回 true。 2.无序集合，必须元素个数相等，且一个集合中的任意一个元素都在另一个集合中有相同的，返回true。

int hashCode()  // 
  
boolean isEmpty() // 集合中没有元素，返回true
  
Iterator<E> iterator() // 返回集合中所有元素的迭代函数，有序返回有序，无序则无序。 

boolean remove(Object o) //删除指定目标相等的元素，返回true，若未找到，则返回false。 对于有重复元素的情况下，只会删除第一个对应的。 
  
boolean removeAll(Collection<?> c) // 删除集合中和指定集合相等的所有元素，重复情况也删除，如果集合有删除(即使只有1个对应的)，返回true，没有删除任何元素，返回false。 
  
boolean retainAll(Collection<?> c) // 和removeAll相反，删除集合中不包含在指定集合内的元素，即和指定集合不同的元素都删除。 
  
int size() // 返回集合元素个数，大小不超过 0x7fffffff。 

Object[] toArray() //返回包含集合中所有元素的数组，集合有序则返回的数组也是同样的顺序。 
  
<T> T[] toArray(T[] a) //以泛型的形式指定返回的数组的类型。 


```





##### List

> 元素是有序的，可重复的，可以有null元素的存在

是Collection的直接接口，

###### ArrayList

动态数组，默认初始的数组大小是10，每次动态操作(添加、删除元素)列表后，都会检查是否需要扩容，所以在创建数组列表时，最好手动指定初始化的大小。

操作ArrayList等同于操作数组。

所以：

随机访问快，添加删除元素慢，非同步。 



###### LinkedList

双向链表，因为是链表实现，所以比ArrayList多了插入、删除首部、尾部等方法。 

不能随机访问，插入，删除操作快，非同步。

可用：`List list = Collections.synchronizedList(new LinkedList(…));`

###### Vector

是线程同步的ArrayList

###### Stack

继承自Vector，是后进先出的堆栈。

增加push，pop、search、peek等堆栈方法



##### Set

> 元素是无序的、不可重复的。可以有null元素的存在，但仅支持一个(不重复)



###### EnumSet

所有元素都是枚举类型



###### HashSet

是value为null的HashMap。 

###### TreeSet

内部用TreeMap实现，



##### Map

> 和List、Set不同，由一系列键值对组成的集合，没有继承Collection。在Map中保证了key到value的一一对应关系，一个key对应一个value，所以不能存在相同的key，key不重复。 

Hashtable

​	Properties

HashMap

​	LinkedHashMap

TreeMap

ConcurrentHashMap

EnumMap

###### HashMap

哈希表实现，内部有一个数组，通过函数将哈希值转为数组索引，如果有相同，使用散列表，单向链表存储。只有hashmap允许存空值为key或者value。

###### TreeMap

红黑树实现，且实现了SortedMap接口，可排序。 

###### HashTable

哈希表，字典。线程安全，推荐用ConcurrentHashMap替换。

##### Queue

队列，继承自Collection.

主要分两类：

1.阻塞式队列(BlockingQueue)，如果队列满了再插入会抛出异常` ArrayBlockQueue、PriorityBlockingQueue、LinkedBlockingQueue`

2.双端队列(Deque)，支持在头尾两端插入、移除元素。`ArrayDeque、LinkedBlockingDeque、LinkedList`。





###### Vector和ArrayList

1. vector是线程同步的，线程安全的。ArrayList不是。如果不考虑多线程环境，ArrayList效率比较高。
2. 数组动态扩容时，Vector每次增加原数组的100%，ArrayList是50%。 



###### ArrayList和LinkedList

1. ArrayList是动态数组，LinkedList是双向链表。
2. 对于随机访问，前者优于后者，因为后者要移动指针。
3. 对于新增和删除操作，后者比较优势，因为前者要移动数据。
4. ArrayList每移动一条数据，要移动插入点之后的所有数据。

将ArrayList作为首选，只有当程序频繁插入和删除List时，在考虑LinkedList。 

###### HashMap和TreeMap

1. HashMap是根据哈希表，TreeMap是根据红黑树。
2. HashMap通过hashcode访问速度非常快，TreeMap中所有元素都保持着某种固定顺序(二叉搜索树是有序的)。
3. 在Map中插入、删除和定位元素，hashmap是最好的选择。 如果要按自然顺序或自定义顺序遍历键，TreeMap。



###### Hashtable和Hashmap

1. hashtable是线程安全的，hashmap不是。
2. hashmap可以存储null，table不可以。



###### TreeMap和LinkedHashMap

1. 都是有序的，但是LinkedHashMap只允许保存录入时的顺序或者是访问顺序，需要手动进行排序。而TreeMap可以指定Compar接口比较大小，自动实现排序，默认是key的字母大小排序。





#### 线性结构

结构中数据元素之间存在一对一的关系

Linked list

#### 树形结构

结构中数据元素之间存在一对多的关系

总之，当我们看到一个树形数据结构，主要应该考察以上两个方面：
①它是如何建立索引的？
②它是如何维持稳定的？

二分查找算法



#### 图(网)状结构

结构中数据元素之间存在多对多的关系



## 排序



n中排序方法



## 查找

线性表(单向链表、双向链表)、二叉树、平衡二叉树、红黑树 











