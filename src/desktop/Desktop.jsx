import Sidebar from './Dock';
import TopBar from './TopBar';
import Workspace from './Workspace';
import StatusBar from './StatusBar';

export default function Layout() {
    return (
        <div className="app">
            <TopBar />
            <div className="main">
                <Sidebar />
                <Workspace />
            </div>
            <StatusBar />
        </div>
    );
}