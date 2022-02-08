export default function ViewExchange(props) {
  // Display Exchange Rate and selected tokens

  return (
    <table
      className="
        table
        is-fullwidth
        has-background-primary-light has-text-grey-darker
      "
    >
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Exchange Rate</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <p >{props.from}</p>
          </td>
          <td>
            <p >{props.to}</p>
          </td>
          <td>
            <p >{props.rate}</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
