const Sidebar = ({ onAddFolder, onAddTask, onDelete, onRename, onMove }) => {
  // Exemplo de como os dados podem ser exibidos, você pode modificar conforme sua necessidade
  return (
      <div className="Sidebar bg-gray-300 p-4">
          <button onClick={onAddFolder} className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded">
              Adicionar Pasta
          </button>
          <button onClick={onAddTask} className="w-full mb-4 px-4 py-2 bg-green-500 text-white rounded">
              Adicionar Tarefa
          </button>
          {/* Outros botões de manipulação de tarefas */}
          <button onClick={onDelete} className="w-full mb-4 px-4 py-2 bg-red-500 text-white rounded">
              Excluir Tarefa
          </button>
          <button onClick={onRename} className="w-full mb-4 px-4 py-2 bg-yellow-500 text-white rounded">
              Renomear Tarefa
          </button>
          <button onClick={onMove} className="w-full mb-4 px-4 py-2 bg-purple-500 text-white rounded">
              Mover Tarefa
          </button>
      </div>
  );
};

export default Sidebar;
