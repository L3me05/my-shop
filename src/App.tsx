import './App.css'

function App() {

  return (
    <>
      <div className='page'>
        <h1 className='title'>Shop</h1>
        <button className='btn ' >prova</button>
        <input type="text" />


        <table className="table-auto w-full hover">
          <thead>
            <tr>
                <th>Song</th>
                <th>Artist</th>
                <th>Year</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
          </tbody>
        </table>

        
      </div>
    </>
  )
} 

export default App
