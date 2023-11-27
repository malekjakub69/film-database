import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { NotificationCenter } from './components/NotificationCenter';
import { MainPage } from './layouts/MainPage';
import { FavoriteFilmPage } from './layouts/favorite/FilmFavoritePage';
import { FilmSearchPage } from './layouts/filmSearch/FilmSearchPage';

export const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

export const appRouter = createBrowserRouter([
    {
        path: '*',
        Component: MainPage,
        children: [
            { path: 'films', Component: FilmSearchPage },
            { path: 'favorites', Component: FavoriteFilmPage },
            { path: '*', element: <Navigate to="/films" /> }
        ]
    }
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <NotificationCenter />
                <RouterProvider router={appRouter} />
            </div>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default App;
