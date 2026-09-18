import { useCallback, useRef, useState } from "react";

export default function VisorPDF() {
  const [archivo, setArchivo] = useState(null);
  const [arrastrando, setArrastrando] = useState(false);
  const inputRef = useRef(null);

  const cargarArchivo = useCallback((file) => {
    if (!file || file.type !== "application/pdf") return;
    setArchivo((anterior) => {
      if (anterior?.url) URL.revokeObjectURL(anterior.url);
      return { nombre: file.name, url: URL.createObjectURL(file) };
    });
  }, []);

  return (
    <div className="visor-pdf">
      <div className="visor-pdf__header">
        <h3>Documento fuente</h3>
        {archivo && (
          <button
            type="button"
            className="btn-enlace"
            onClick={() => {
              URL.revokeObjectURL(archivo.url);
              setArchivo(null);
            }}
          >
            Quitar
          </button>
        )}
      </div>

      {archivo ? (
        <div className="visor-pdf__contenido">
          <iframe title={archivo.nombre} src={archivo.url} className="visor-pdf__iframe" />
        </div>
      ) : (
        <div
          className={"visor-pdf__dropzone" + (arrastrando ? " visor-pdf__dropzone--activo" : "")}
          onDragOver={(e) => {
            e.preventDefault();
            setArrastrando(true);
          }}
          onDragLeave={() => setArrastrando(false)}
          onDrop={(e) => {
            e.preventDefault();
            setArrastrando(false);
            cargarArchivo(e.dataTransfer.files?.[0]);
          }}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
        >
          <div className="visor-pdf__icono">PDF</div>
          <p>Arrastra el estado financiero en PDF aquí</p>
          <span>o haz clic para seleccionar un archivo</span>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => cargarArchivo(e.target.files?.[0])}
          />
        </div>
      )}
    </div>
  );
}
