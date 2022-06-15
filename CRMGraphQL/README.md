# Apollo

## Example New User
### Operation
```bash
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
```rust
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
### Operation

```bash
mutation autenticationUser($input: AutenticarInput){
  autenticationUser(input: $input) {
    token
  }
}
```

###  Header Variables
```rust
{
  "input": {
    "email": "email@email.com",
    "password": "1234"
  }
}
```

## Example obtenerUsurio
### Operation 
```bash
query obtenerUsurio($token: String!){
  obtenerUsurio(token: $token) {
    id
  }
}
```
###  Header Variables
```rust
{
  "token": "copiamos el token generado"
}
```

## Example newProduct
### Operation 
```bash
mutation NewProduct($input: ProductoInput) {
  newProduct(input: $input) {
    id
    nombre
    existencia
    precio
    created
  }
}
```
###  Header Variables
```rust
{
  "input": {
    "nombre": "iPad",
    "existencia": 100,
    "precio": 500
  }
}
```