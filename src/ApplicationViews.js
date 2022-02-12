import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Home } from "./Home"
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { AnimalList } from './components/animal/AnimalList.js'
import { CustomerList } from "./components/customer/CustomerList"
import { LocationList } from "./components/location/LocationList"
import { EmployeeList } from "./components/staff/EmployeeList"
import { AnimalDetail } from "./components/animal/AnimalDetail"
import { EmployeeDetail } from "./components/staff/EmployeeDetail"
import { LocationDetail } from "./components/location/LocationDetail"
import { AnimalForm } from './components/animal/AnimalForm'
import { LocationForm } from './components/location/LocationForm'
import { CustomerForm } from './components/customer/CustomerForm'
import { EmployeeForm } from './components/staff/EmployeeForm'
import { AnimalEditForm } from "./components/animal/AnimalEditForm"
import { CustomerEditForm } from "./components/customer/CustomerEditForm"
import { LocationEditForm } from "./components/location/LocationEditForm"
import { EmployeeEditForm } from "./components/staff/EmployeeEditForm"



export const ApplicationViews = ({ isAuthenticated, setIsAuthenticated }) => {
    
    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    }
  
    const setAuthUser = (user) => {
      sessionStorage.setItem("kennel_customer", JSON.stringify(user))
      setIsAuthenticated(sessionStorage.getItem("kennel_customer") !== null)
    }

    return (
        <>
            <Routes>

                <Route exact path="/login" element={<Login setAuthUser={setAuthUser} />} />
                <Route exact path="/register" element={<Register />} />
                
                {/* Render the homepage list when http://localhost:3000/ */}
                <Route exact path="/" element={<Home />} />

                {/* Render the animal list when http://localhost:3000/animals */}
                <Route exact path="/animals" element={<PrivateRoute> <AnimalList /> </PrivateRoute>} />
                <Route exact path="/animals/:animalId" element={<PrivateRoute> <AnimalDetail /> </PrivateRoute>} />
                <Route path="/animals/create" element={<AnimalForm />} />
                <Route path="/animals/:animalId/edit" element={<PrivateRoute> <AnimalEditForm /> </PrivateRoute>} />

                {/* Render the location list when http://localhost:3000/locations */}
                <Route exact path="/locations" element={<LocationList />} />
                <Route exact path="/locations/:locationId" element={<LocationDetail />} />
                <Route path="/locations/create" element={<LocationForm />} />
                <Route path="/locations/:locationId/edit" element={<PrivateRoute> <LocationEditForm /> </PrivateRoute>} />

                {/* Render the customer list when http://localhost:3000/customers */}
                <Route exact path="/customers" element={<PrivateRoute> <CustomerList /> </PrivateRoute>} />
                <Route path="/customers/create" element={<CustomerForm />} />
                <Route path="/customers/:customerID/edit" element={<PrivateRoute> <CustomerEditForm /> </PrivateRoute>} />

                {/* Render the employee list when http://localhost:3000/employees */}
                <Route exact path="/employees" element={<PrivateRoute> <EmployeeList /> </PrivateRoute>} />
                <Route exact path="/employees/:employeeId" element={<EmployeeDetail />} />
                <Route path="/employees/create" element={<EmployeeForm />} />
                <Route path="/employees/:employeeID/edit" element={<PrivateRoute> <EmployeeEditForm /> </PrivateRoute>} />

            </Routes>
        </>
    )    
}

