# Vulnerable Web Application built with NodeJS
## Warning: DO NOT UPLOAD TO ANY PUBLIC SERVER AS IT WILL BE COMPROMISED
## Note: Application not fully complete, brute forcing is the only option which has full functionality so far.

## SETUP
You will need nodeJs, npm and nodemon for this project to build successfully.<br/><br/>
This project can be set up by cloning:<br/>
` git clone https://github.com/tonyx774/vulnWebApp-NodeJS.git`

Run the dbServer file using:<br/>
`nodemon dbServer `
<br/>


## BRUTE FORCING
<br><br>

## Weak
For the weak security setting, the password can easily be bruteforced using many different tools, the two I will demonstrate are "burpsuite" and "wfuzz". 
#### **Setting up easy security level**
![selectSecurityWeak](https://user-images.githubusercontent.com/92649279/140629770-aa15ab0c-36b6-4755-8b6a-945e4a132a67.PNG)
<br><br>
#### **Navigate to brute force**
![selectBruteForce](https://user-images.githubusercontent.com/92649279/140629779-6bf55d8e-9037-404c-b9a0-450042b62da9.PNG)
<br><br>   
#### **BurpSuite**
After opening burpsuite and  intercepting the request and starting an attack by forwarding it to the intruder we are shown the following and can see the only password without the incorrect field is named "qwerty" for the user "jack"
![burpSuiteEasy](https://user-images.githubusercontent.com/92649279/140629745-1029562d-6aaf-4052-9aab-a806759079bb.PNG)
<br>**Resources to help you figure out how to do this yourself:**<br>
https://portswigger.net/support/using-burp-to-brute-force-a-login-page

#### **wfuzz**
Firstly make sure you have wfuzz installed. It is a fuzzing tool which will allow us to get the password by fuzzing very quickly.
<br><br>
Run the following command <br> 

![wFuzzCommandEasy](https://user-images.githubusercontent.com/92649279/140629789-dd46e0b1-8f5c-4f9e-a61a-368c9d5f8d02.PNG)
<br>
<br>
**Explanation**<br><br>
`-w burett_top_500.txt`  <br>   will choose the text file which i have added to my current directory <br><br>
`-b Level=Weak` <br>   sets the cookie value of Level to weak<br><br>
`-d "username=tony&password=FUZZ" 'http://10.0.2.2:3000/login'` <br>  this is used to specify the username as "tony" and it also sets the password as FUZZ which means that the fuzzer will loop through the wordlist extremely quickly (due to no throttling) and insert a different word here for each attempt
<br><br>
#### **Result**
<br>
Here we can see the the password "abc123" has a different response length this indicates that it is correct. We could also grep the reply for a different length to only display correct passwords if we wanted to. <br>

![wFuzzResultEasy](https://user-images.githubusercontent.com/92649279/140629795-bba5c996-ddf3-4158-b989-0444270b0cd4.PNG)

<br>

We can also add a userlist parameter in the wFuzz command to also loop through different users however i will leave this up to you to learn for yourself <br><br>

<br>**Resources to help you figure out how to do this yourself:**<br>

https://wfuzz.readthedocs.io/en/latest/user/basicusage.html<br>
https://en.wikipedia.org/wiki/Fuzzing



<br><br><br>

## Moderate
For the moderate security setting, the password can easily be bruteforced using many different tools, however throttling has been added to the code for each invalid password attempt.
<br><br>
The methods for this are the same as the methods for the easy Security level however you will notice that the fuzzer will be alot slower due to the added throttling in the code.
<br>**Resources:**<br>
https://symfony.com/blog/new-in-symfony-5-2-login-throttling <br>
## Strong
For the strong security setting, throttling and a csrf token have been added. This blocks tools such as "burpsuite" and "wfuzz" from working as they will submit and invalid csrf token. However this too can be bypassed using *hint* certain parameters in wFuzz  and I will leave this up to you to discover.<br>
<br>**Resources:**<br>
https://portswigger.net/web-security/csrf/tokens
<br>
## Impossible  - **to be added in future commits**
For this security setting, throttling and csrf tokens are enabled. The user also is locked out for 15 minutes after three incorrect password attempts
