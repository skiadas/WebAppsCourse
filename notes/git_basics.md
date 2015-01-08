# Basics of working with Git

## Relevant Links

- [Pro git book](http://git-scm.com/book/en/v2)
- [Git command reference](http://git-scm.com/docs)
- [Read this](http://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository) Chapter 2 (at least skim through it)

## Notes

### Starting a repository

- The most common way to start work is by cloning an existing repository, and we will learn about that later. For now, we will look into starting a fresh repository.
- Start by going to the directory that you want to have become a repository.
- We can type `git init` to start maintaining the current directory as a repository. It is OK if there is stuff already there, it will not be deleted or anything like that. But for now, do it to a new directory.

### Recording changes

Look at this [picture](http://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository) for a good idea on the different stages that files can be in.

The main command used to get information about the status of your files is `git status`. If we try this on our empty directory, we get a nice clean message that there's nothing to do. Let's get something in there. Open the folder in Sublime Text. You can do it by typing "`subl .`"

Let's create a new HTML file, call it `testFile.html`. Try these contents:
```
<!DOCTYPE html>
<html>
   <body>
      <p>Hello world!</p>
   </body>
</html>
```

Save the file, and back on the terminal type `git status`. It should tell you that you now have one untracked file.

To start tracking this file, you need to add it:

```
git add testFile.html
git status
```

You should see that the file now is staged to be committed when we make the next commit. Git also tells you what to do if you want to unstage it. Let's try it:

```
git rm --cached testFile.html
git status
git add testFile.html
```

Let us go ahead and commit this file:

```
git commit
```

This should open a window in your chosen editor, allowing you to type in a comment to go with the commit. Type in a comment, save and close the window. Git will get back to you with an somewhat informative message. Try `git status` again.

Let us go back and edit our file:

```
<!DOCTYPE html>
<html>
   <body>
      <p>Goodbye cruel world!</p>
   </body>
</html>
```

Try `git status` again. It will now tell you that there is a modified file, but that it is not staged for commit. To get more information, we can use `git diff`. Try that now. It should show you that there is one line removed, and one line inserted. Go ahead and do an "add" to stage that change.

It is typical that you might want to review the changes that you are about to commit before you do so. you can do this as follows:

```
git diff --staged
```

Now do a "commit". If you want to skip the "message in the editor" part, you can instead do this:

```
git commit -m "Hello becomes goodbye"
```

Congratulations, you have now made your first two commits! We will see a bit later how to view previous commits and other cool stuff.
