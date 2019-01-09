# How to run Javascript

In this section we discuss how to quickly run Javascript code. There are two main ways: In the browser, and with Node.

## Javascript in Chrome

Using Chrome to work with Javascript is easy. Start by opening the Developer tools, then go to the Console tab.

That's it! You can now interact with Javascript much in the same way you would do with the Python REPL. Try some arithmetic operations!

All the work you do here is tied to the particular page. If you reload the page, you will lose any definitions you made along the way.

Type `window` on the console, you should see an object, which you can expand and explore. This is the "global object" of Javascript; everything you do happens in one way or another under this object. As an example, try the following:

```js
a = 23     // Sets a new variable a to equal 23
window.a   // That variable was created as a property of the window object
```

We will have a lot more to say about all this later.

## Javascript in Node

Node is essentially an implementation of Javascript that is meant to run directly on your computer, rather than inside a browser. As such, it contains the core Javascript, but not any of the extensions that make Javascript interact with the webpage. Instead, it contains numerous libraries to allow you to work with the computer's resources, such as file streams, directory information, multiple processes.

Make sure you are on a terminal.

We will first discuss locally installing Node. If you don't have administrator access on your computer, you will likely need to follow these steps.

Here is a [link](https://gist.github.com/isaacs/579814) with numerous ways to install Node. We will use the [approach using nave](https://gist.githubusercontent.com/isaacs/579814/raw/14f8c47ba12166cfe53e0e80d0e978fc02327091/use-nave.sh).

First, we create a folder to contain nave:
```
mkdir ~/.nave
cd ~/.nave
```

Next we download the nave script. Depending on your system, one of these will work:
```
wget http://github.com/isaacs/nave/raw/master/nave.sh
curl -L http://github.com/isaacs/nave/raw/master/nave.sh > nave.sh
```

We then need to change permissions to make the shell executable:
```
chmod u+x nave.sh
cd ~
```

We can now prefix all commands with "~/.nave/nave.sh". The following will install the latest node installation.
```
~/.nave/nave.sh install latest
```

The following will start a subshell, in which the latest Node version is activated:
```
~/.nave/nave.sh use latest
node
```

These are the two lines you will need to type every time you want to get a Node console going.

Now you are in a Javascript "console". Go ahead and try to type some stuff out! If you want to see the "global object", it is called `global` in this case. Press `Ctrl-D` to exit.

At this point you are still within the "subshell" created by nave. Type "exit" to return to the "normal" terminal.

Before leaving this section, make sure you are in the subshell again, and install "npm" via the following:
```
curl -L https://www.npmjs.org/install.sh | sh
```
