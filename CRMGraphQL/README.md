# Apollo

## Example New User
### Operation Example
```
mutation newUser($input: UserInput){
  newUser(input: $input){
    id
    nombre
    apellido
    email 
  }
}
```
###  Header Variables
```
{
  "input": {
    "nombre": "Marcos",
    "apellido": "Gutierrez",
    "email": "email@email.com",
    "password": "1234"
  }
}
```


## Example Hash Password
### Operation Example

```
mutation autenticationUser($input: AutenticarInput){
  autenticationUser(input: $input) {
    token
  }
}
```

###  Header Variables
```
{
  "input": {
    "email": "email@email.com",
    "password": "1234"
  }
}
```