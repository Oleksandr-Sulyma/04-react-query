import styles from "./SearchBar.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

interface SearchBarValues {
  query: string;
}

const initialValues: SearchBarValues = {
  query: "",
};

const SearchBarSchema = Yup.object({
  query: Yup.string()
    .trim()
    .required("Please enter your search term.")
    .max(20, "Search query is limited to 20 characters."),
});

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (
    values: SearchBarValues,
    actions: FormikHelpers<SearchBarValues>,
  ) => {
    const query = values.query.trim();
    // if (!query) {
    //   toast.error("Please enter your search query.");
    //   return;
    // }
    onSubmit(query);
    actions.resetForm();
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <Formik
          initialValues={initialValues}
          validationSchema={SearchBarSchema}
          onSubmit={handleSubmit}
        >
          <Form className={styles.form}>
            <ul className="field-yup-box">
              <li>
                <Field
                  className={styles.input}
                  type="text"
                  name="query"
                  autoComplete="off"
                  placeholder="Search movies..."
                  autoFocus
                />
              </li>
              <li>
                <ErrorMessage
                  name="query"
                  component="div"
                  className={styles.error}
                />
              </li>
            </ul>

            <button className={styles.button} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>
    </header>
  );
}
