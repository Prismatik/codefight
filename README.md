## What?

This is to provide a way to showcase new approaches, novel techniques, and general cleverness.

There will be a challenge, and it will be up to you to solve that challenge in an excellent, interesting or hilarious way.

Use any language you like. Use any framework you like. Use any tools you like. Use any libraries you like.

Once we're all done, we can all look through what's been done and see what we like the look of.

## How?
To play, fork this repo, make a branch. When you're happy with your thing, submit a PR or push it yourself.

##Your mission:

A client needs to know what is happening on the social networks. All of them. Right now.

The three social networks the client is interested in are:

http://codefight.davidbanham.com/twitter

http://codefight.davidbanham.com/facebook

http://codefight.davidbanham.com/instagram

Because these social networks are so webscale, they don't always respond predictably. The delay in their response almost appears like someone waited for a random integer of seconds before responding!

The client needs to be able to run your thing, then issue the command:

curl localhost:3000

And get back a JSON response of the output from the three social networks in the format:

{
  twitter: [tweets],
  facebook: [statuses],
  instagram: [photos]
}

Order isn't important.

This should be a quick little task, but the client is paying us A Billion dollars for it so make sure your implementation is as robust as it is beautiful.

Have fun!
