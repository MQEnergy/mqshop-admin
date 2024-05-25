import {DrawerForm, DrawerFormProps} from "@/components/custom/drawer-form.tsx";

interface AddForm extends DrawerFormProps {
  isOpen: boolean;
  onSubmit: () => void;
}

export function AddForm(props: AddForm) {
  return (
      <DrawerForm open={props.isOpen} onClose={props.onClose} onSubmit={props.onSubmit}>
        <div className='space-y-4'>
          <div className='bg-muted flex items-center justify-center rounded-lg h-32'>
            <p>Image 1</p>
          </div>
          <div className='bg-muted flex items-center justify-center rounded-lg h-32'>
            <p>Image 2</p>
          </div>
          <div className='bg-muted flex items-center justify-center rounded-lg h-32'>
            <p>Image 3</p>
          </div>
          <div className='bg-muted flex items-center justify-center rounded-lg h-32'>
            <p>Image 4</p>
          </div>
          <div className='bg-muted flex items-center justify-center rounded-lg h-32'>
            <p>Image 4</p>
          </div>
          <div className='bg-muted flex items-center justify-center rounded-lg h-32'>
            <p>Image 5</p>
          </div>
          <div className='bg-muted flex items-center justify-center rounded-lg h-32'>
            <p>Image 6</p>
          </div>
          <div className='bg-muted flex items-center justify-center rounded-lg h-32'>
            <p>Image 7</p>
          </div>
          <div className='bg-muted flex items-center justify-center rounded-lg h-32'>
            <p>Image 8</p>
          </div>
          <div className='bg-muted flex items-center justify-center rounded-lg h-32'>
            <p>Image 9</p>
          </div>
          <div className='bg-muted flex items-center justify-center rounded-lg h-32'>
            <p>Image 10</p>
          </div>
          <div className='bg-muted flex items-center justify-center rounded-lg h-32'>
            <p>Image 11</p>
          </div>
        </div>
      </DrawerForm>
  )
}
