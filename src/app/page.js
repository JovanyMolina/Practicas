import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="ContenedorInicio">
      <Link href='/practica1' className="botonesInicio">PRACTICA#1</Link>
      <Link href='/practica2' className="botonesInicio">PRACTICA#2</Link>
      <Link href='/practica3' className="botonesInicio">PRACTICA#3</Link>
      <Link href='/practica4' className="botonesInicio">PRACTICA#4</Link>
      <Link href='/practica5' className="botonesInicio">PRACTICA#5</Link>
      <Link href='/practica6' className="botonesInicio">PRACTICA#6</Link>
      
    </div>
  );
}
