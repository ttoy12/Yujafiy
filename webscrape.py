import requests
from bs4 import BeautifulSoup
from requests_html import HTMLSession

url = 'https://react-amazon-bestsellers-books-dy.netlify.app/'
#url = 'https://media.ucsc.edu/P/VideoManagement/MediaLibrary/MediaChannel/935523/WatchVideo/41252144'



session = HTMLSession()
response = session.get(url)

response.html.render()

soup = BeautifulSoup(response.html.html, 'html.parser')



books = soup.find_all('article', class_='book')

for book in books:
    print(book.find('h2').text)




