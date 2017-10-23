import re
import string
import sys
import os
import urllib
import time
import ssl
from bs4 import BeautifulSoup
import requests
from lxml import etree

#user_id=5350703203 
user_id=2679381427

header = {'User-Agent': 'User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'}  
cookie={"Cookie":"_T_WM=7df5f69e2042c205ac3b9761322ea7db; SCF=Ag1QDUJKGrJywF5TvCRqCNQ_35Fu2vx2O7DF5AQ6itdYfcvTARkovtxDT4Xyn1uDLDiJC9yRaTj72rEsYcXxvfM.; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WFhRJgyGO71luuIECwX9Lnm5JpX5o2p5NHD95QceK-NSoeRShBfWs4Dqcj_i--fi-zpiKnRi--RiKy8iKn4i--NiK.7i-z0i--RiKysiKnpi--Ni-8Fi-z4; SUB=_2A250HtU2DeRhGeBP7lsV9y_EyTuIHXVX4Pt-rDV6PUJbkdBeLXP8kW2aTLVA9UJVSz7IzfvD17Xa3wD2GQ..; SUHB=0gHiwb3AOP9ThL; SSOLoginState=1494918502"}
pages=400

for page in range(pages):
  if(page!=0):
    print("休息五分钟...")
    time.sleep(300)
     
  url = 'https://weibo.cn/u/%d?page=%d&filter=0'%(user_id,page)
  path=str(user_id)
  #os.makedirs(os.path.join("G:\\newcomment", path)) ##创建一个存放套图的文件夹

 # os.chdir("G:\\newcomment\\"+path) ##切换到上面创建的文件夹
  os.chdir("G:\\newcomment")
  # url ='http://weibo.com/p/10080887f2e6485dd785d69d9a16a6edaf1ce6?page=%d'%(page)
  html = requests.get(url,cookies=cookie,headers=header)
  
  Soup = BeautifulSoup(html.text, 'lxml')

  alla=Soup.find_all("div",class_="c")    #所有的微博
 
  #p=alla[4].find("a",class_="cc")
 # print(p)
  for a in alla[2:]:
   try:
     per = a.find("a",class_="cc")  #每条微博的评论
   
     regular1=re.compile(r"\d+")
     
 
     pgs = regular1.findall(per.text)  #每条微博对应的评论数
  
   except AttributeError:
      print("错误")
   else:
     href=per['href']  #每条微博对应的评论链接
     comments = requests.get(href,cookies=cookie)
     soup = BeautifulSoup(comments.text, 'lxml')
     comment = soup.find_all("div",class_="c")#评论链接里评论的div
     

     for cmt in comment:
       
       content = cmt.find("span",class_="ctt")   #评论内容
      
       times = cmt.find("span",class_="ct")
       if (content):
           name=path
           f = open(name+'.txt', 'a+',encoding="utf-8")
           f.write(times.text[:19]+"     "+content.text+"\n")
           
          #print(content.text,time.text[:19])
      
     if(int(pgs[0])>10):              #一条微博的评论数大于10，即有多页
       try:
        regular2=re.compile(r"\d+")
        pg=soup.find("div",class_="pa").find("div")
       except AttributeError:
          print("'NoneType' object has no attribute 'find'")
       else:
        
        pagenum=regular2.findall(pg.text)[1]   #抓取页数
        
        for i in range(2,int(pagenum)+1):       
           newhref=per['href'][:-7]+"&page=%d"%(i)    #第i页的url
           newcomments = requests.get(newhref,cookies=cookie)
           newsoup = BeautifulSoup(newcomments.text, 'lxml')
           newcomment = newsoup.find_all("div",class_="c")           
 
           for newcmt in newcomment:
       
              newcontent = newcmt.find("span",class_="ctt") 
              
              newtime = newcmt.find("span",class_="ct")
              if (newcontent):
                name=path
                f = open(name+'.txt', 'a+',encoding="utf-8")
                f.write(newtime.text[:19]+"     "+newcontent.text+"\n")
         
   
