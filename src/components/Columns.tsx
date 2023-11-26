import Column from "./Column";
import NewTodo from "./NewTodo";

const Columns = () => {
  return (
    <div>
      <NewTodo />

      <section className="mt-10 flex gap-6 lg:gap-12">
        <Column title="Todo" status="TODO" />
        <Column title="In Progress" status="IN_PROGRESS" />
        <Column title="Done" status="DONE" />
      </section>
    </div>
  );
};

export default Columns;
