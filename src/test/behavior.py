from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from chromedriver_py import binary_path # this will get you the path variable
from selenium.webdriver.common.keys import Keys
from pynput.keyboard import Key, Controller
import keyboard
from time import sleep

keys = Controller()

service_object = Service(binary_path)
driver = webdriver.Chrome(service=service_object)
def main(): 
    
    driver.get('http://54.237.2.184:8080/') #Navigates to our game's webpage
    sleep(3)
    keys.press(Key.enter)
    keys.release(Key.enter)
    sleep(3)
    keys.press(Key.enter)
    keys.release(Key.enter)
    sleep(3)
    keys.press(Key.enter)
    keys.release(Key.enter)
    #Enter keys are pressed and released via code in order to test whether the screens will change with user input
    while True:
        if keyboard.is_pressed("f9"):
            exit()

if __name__ == '__main__':
    main()