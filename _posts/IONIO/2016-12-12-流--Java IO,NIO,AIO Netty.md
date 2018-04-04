---
layout: post
title:  "Java IO,NIO,AIO"
date:   2016-12-12 21:16:19
categories: IO/NIO 
tags: IO/NIO IO 
---

* content
{:toc}

>Java IO,NIO,AIO。





# Java IO,NIO,AIO/ Netty

## Java IO

分组： 

基于字节操作：InputStream OutputStream

基于字符操作：Writer Reader

基于磁盘操作：File

基于网络操作：Socket



## BIO

```java

	public static void main(String[] args) {
		int port = 8080;
		
		ServerSocket server = null;
		try {
			server = new ServerSocket(port);
			
			Socket socket = null; 
			while(true){
				socket = server.accept();
				System.out.println("get one connected!");
				new Thread(new TimeServerHandler(socket)).start();
			}
        }
```



通过`ServerSocket` 监听端口，使用`accept`方法，阻塞等待新接入的连接，并生成`Socket`与之进行通信。 

```java
	public static void main(String[] args) {
		int port = 8080;

		Socket socket = null;
		BufferedReader in = null;
		PrintWriter out = null;

		try {
			socket = new Socket("127.0.0.1", port);
			in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

			StringBuilder sb = new StringBuilder();

			out = new PrintWriter(socket.getOutputStream(), true);
			out.println("Time");
			System.out.println("Sent order success!");
			String rep = in.readLine();
			System.out.println("Now is : " + rep);
```



`Socket`使用host和port实例化后，就会触发`ServerSocket`的`accept`方法，构成与Server的通信。 

后面的就是两个Socket之间的通信了。 

通过`Socket`获取的inputstream，使用的read方法也是阻塞的。 

当客户端方发送请求或者应答比较缓慢，或者网络比较慢时，服务端读取输入流方的通信线程将被长时间阻塞，且不被释放，而其他的接入消息只能在消息队列中等待。  



每个连接在服务端会新建一个线程与其对应，当连接端关闭后，线程运行完毕。 

但是，连接端发送大量数据或者网络较慢，接收慢的时候，线程会一直处于阻塞状态，不会消失。 如此，会导致服务端有大量线程，无法应对高并发的情况。 





## NIO



Not Block IO, 非阻塞IO。 

阻塞，就是等待、不动直到某个条件才继续。 

如Java中的scan，用于接受控制台输入，否则程序就不向下执行。 

BIO中serverSocket的accept就是阻塞的，等待，直到有一个socket接入 。 

而NIO中，是通过selector的轮询



多路复用器

Selector会不断地轮询注册在其上的Channel，如果某个Channel上面发生读或者写事件，这个Channel就处于就绪状态，会被Selector轮询出来， 



目前来看，是为多路复用器开启一个线程， 没来一个连接，都会注册到这个多路复用器Selector上，连接和Selector产生关联， 然后 Selector会遍历将 读或者写 处于就绪状态的连接放入一个集合返回，针对这个集合进行下一步操作。 

这样就不存在一个连接对应一个线程的情况，省去了多线程阻塞等待读或者写就绪的情况，当读或者写就绪的时候，通过Selector获取。 

最多由该服务器的最大句柄数控制。 



还有，Nio使用Channel进行读写，和Bio使用Stream不同，Bio读写分开(Input和Output)，而Channel是同时可以读和写的。 



## AIO





## Other 

使用Netty开发一个聊天室

使用反射开发一个Mvc框架

放到Github上， 学习 Maven打包 

了解Guvvo这个打包工具 









