import axios from "axios";

const fetcher = (...args) =>
    args.length ? axios.get(...args).then((res) => res.data) : null;

export default fetcher;
