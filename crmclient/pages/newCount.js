import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { useMutation, gql } from "@apollo/client";
import { mostrarMensaje, errorMensaje } from "../helpers/Message";

const NUEVA_CUENTA = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      id
      nombre
      apellido
      email
    }
  }
`;

const NewCount = () => {
  /* mostrar mensaje de error */
  const [mensaje, guardarMensaje] = useState(null);

  /* Mutation */
  const [newUser] = useMutation(NUEVA_CUENTA);

  /* Routing */
  const router = useRouter()

  /* validacion de formulario 
     valores se agregan al value en los inputs
  */
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obligatorio"),
      email: Yup.string()
        .email("Email no es valido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("Password no puede ir vacio")
        .min(6, "Password debe de llevar mas de 6 caracteres"),
    }),
    onSubmit: async (valores) => {
      // console.log("enviando");
      // console.log(valores);

      const {nombre, apellido, email, password} = valores;

      try {
        const {data} = await newUser({
          variables: {
            input: {
              nombre,
              apellido,
              email,
              password
            }
          }
        });
        console.log(data);
        /* Usuario creado correctament */
        guardarMensaje(`Se creo correctamente el Usuario: ${data.newUser.nombre}`)
        setTimeout(() => {
          guardarMensaje(null)
          router.push('/login')
        }, 5000);

        /* Redirigir usuario para iniciar sesion */
      } catch (error) {
        guardarMensaje(error.message);
        setTimeout(() => {
          guardarMensaje(null)
        }, 5000);
      }
    },
  });

 
  return (
    <Layout>

      {mensaje && mostrarMensaje(mensaje)}

      <h1 className="text-center text-2xl text-white font-light">
        Crear Nueva Cuenta
      </h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre Usuario"
                autoComplete="off"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {/* Mensaje de error nombre */}

            {formik.touched.nombre && formik.errors.nombre ? (
              errorMensaje(formik.errors.nombre)
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="apellido"
              >
                Apellido
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="apellido"
                type="text"
                placeholder="Apellido Usuario"
                autoComplete="off"
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {/* Mensaje de error apellido */}

            {formik.touched.apellido && formik.errors.apellido ? (
              errorMensaje(formik.errors.apellido)
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email Usuario"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {/* Mensaje de error email */}

            {formik.touched.email && formik.errors.email ? (
              errorMensaje(formik.errors.email)
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password Usuario"
                autoComplete="off"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {/* Mensaje de error password */}

            {formik.touched.password && formik.errors.password ? (
              errorMensaje(formik.errors.password)
            ) : null}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 text-center"
              value="Crear Cuenta"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewCount;
