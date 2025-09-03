

export default function MainWrapper({
    children,
    title,
}: {
    children: React.ReactNode
    title: string
}) {
  return (
      <main>
          <section className="flex flex-col items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)] p-2">
          <header className="content-grid full-width text-center my-8">
              <h1 className="text-center mt-4 text-8xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">{title}</h1>
          </header>
      
        {children}
      </section>
    </main>
  );
}