registration process:

- get credentials from user (req.body)
- validate those
- check if user with that credentials already exists or not. (Use unique identifier like email or phoneno to validate)
  -if exists, can't register already exists
  -if not, generate a token and create new user
  -send respponse back to user by discarding pw field
