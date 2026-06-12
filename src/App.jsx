import { AuthProvider } from "./context/AuthContext";

function App() {

    return (

        <AuthProvider>

            <div className="container mt-5">

                <h1>
                    Payment Orders System
                </h1>

            </div>

        </AuthProvider>
    );
}

export default App;