import './App.css';

function App() {
  return (
    <div className="container mx-auto px-4">
        <div>
          <label>Email</label>
          <input type="email" name="email"/>
          <label>Password</label>
          <input type="password" name="password"/>
          <button type="button" onClick={e => console.log('inside submit')}>Login</button>
        </div>
    </div>
  );
}

export default App;
