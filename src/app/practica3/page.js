import React from 'react'
import ComponenteCarusel from '@/components/practica3/ComponenteCarusel'
import ComponenteModal from '@/components/practica3/ComponenteModal'
import ComponenteToast from '@/components/practica3/componenteToast'



export default function page() {
  return (
    <div>
       <ComponenteModal />
       <ComponenteToast />
      <ComponenteCarusel />
     
    </div>
  )
}

