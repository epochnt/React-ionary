import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { label: 'All', value: 'all' },
          { label: 'No Discount', value: 'no-discount' },
          { label: 'With Discount', value: 'with-discount' },
        ]}
      />
    </TableOperations>
  )
}
