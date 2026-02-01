import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateCabinForm from './CreateCabinForm'

// export default function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false)

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onClose={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   )
// }

export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-from">
        <Button> Add new cabin </Button>
      </Modal.Open>
      <Modal.Window name="cabin-from">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  )
}
