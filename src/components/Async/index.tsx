import { useEffect, useState } from "react"

const Async = () => {
  const [isButtonInvisible, setIsButtonInvisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsButtonInvisible(true)
    }, 1000)
  }, [])

  return (
    <div>
      <div>Hello World</div>
      {!isButtonInvisible && <button>Button</button>}
    </div>
  )
}

export { Async }