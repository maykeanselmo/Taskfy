<<<<<<< HEAD
import { t } from '../../utils/translations';
=======
import { t, setLanguage } from '../../utils/translations';
import CreateTaskButtom from '../create_task_buttom';
>>>>>>> 8093fb1e25bdbe263ec1c3ac682ff56aca81014b

const Sidebar = ({ onAddFolder, onAddTask, onDelete, onRename, onMove, onSetTag }) => {
  return (
<<<<<<< HEAD
    <div className="Sidebar bg-gray-300 p-4">
      <button onClick={onAddFolder} className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        <h1>{t("add_folder")}</h1>
      </button>
      <button onClick={onAddTask} className="w-full mb-4 px-4 py-2 bg-green-500 text-white rounded">
        <h1>{t("add_task")}</h1>
      </button>
      <button onClick={onDelete} className="w-full mb-4 px-4 py-2 bg-red-500 text-white rounded">
        <h1>{t("delete_task")}</h1>
      </button>
      <button onClick={onRename} className="w-full mb-4 px-4 py-2 bg-yellow-500 text-white rounded">
        <h1>{t("rename_task")}</h1>
      </button>
      <button onClick={onMove} className="w-full mb-4 px-4 py-2 bg-purple-500 text-white rounded">
        <h1>{t("move_task")}</h1>
      </button>
      <button onClick={onSetTag} className="w-full mb-4 px-4 py-2 bg-teal-500 text-white rounded">
        <h1>{t("add_tag")}</h1>
      </button>
    </div>
=======
      <div className="Sidebar bg-gray-300 p-4">
          <button onClick={onAddFolder} className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded">
            <h1>{t("add_folder")}</h1>
          </button>
          <button onClick={CreateTaskButtom} className="w-full mb-4 px-4 py-2 bg-green-500 text-white rounded">
            <h1>{t("add_task")}</h1>
          </button>
          {/* Outros botões de manipulação de tarefas */}
          <button onClick={onDelete} className="w-full mb-4 px-4 py-2 bg-red-500 text-white rounded">
            <h1>{t("delete_task")}</h1>
          </button>
          <button onClick={onRename} className="w-full mb-4 px-4 py-2 bg-yellow-500 text-white rounded">
            <h1>{t("rename_task")}</h1>
          </button>
          <button onClick={onMove} className="w-full mb-4 px-4 py-2 bg-purple-500 text-white rounded">
            <h1>{t("move_task")}</h1>
          </button>
      </div>
>>>>>>> 8093fb1e25bdbe263ec1c3ac682ff56aca81014b
  );
};

export default Sidebar;