import ClientThemeProvider from './ClientThemeProvider';
import NavigationBar from './components/NavigationBar';

export const metadata = {
  title: 'Geo Water',
  description: 'Aplicação para registro e consulta de localizações',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientThemeProvider>
          {/* Adiciona o menu de navegação no topo */}
          <NavigationBar />
          {/* Conteúdo das páginas */}
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}