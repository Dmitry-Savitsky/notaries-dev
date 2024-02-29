import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 5,
  },
  column: {
    flex: 1,
    padding: 5,
  },
});

const AccountingsReport = ({ accountings }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Accountings Report</Text>
        {accountings.map((accounting) => (
          <View style={styles.row} key={accounting.idAccounting}>
            <View style={styles.column}>
              <Text>ID: {accounting.idAccounting}</Text>
              <Text>Accounting Date: {accounting.AccountingDate}</Text>
            </View>
            <View style={styles.column}>
              <Text>Client Name: {accounting.Client.ClientName}</Text>
              <Text>Employee Name: {accounting.Employee.EmployeeName}</Text>
            </View>
            <View style={styles.column}>
              <Text>Service Name: {accounting.Service.ServiceName}</Text>
              <Text>Service Price: {accounting.Service.ServicePrice}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default AccountingsReport;
